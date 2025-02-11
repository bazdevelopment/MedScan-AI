/* eslint-disable max-lines-per-function */
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';

import {
  useInterpretationByDate,
  useUpdateInterpretationFields,
} from '@/api/interpretation/interpretation.hooks';
import { useUser } from '@/api/user/user.hooks';
import CardWrapper from '@/components/card-wrapper';
import { EndScrollPlaceholder } from '@/components/end-scroll-placeholder';
import ReportSkeleton from '@/components/report-card-skeleton';
import ScanReportCard from '@/components/scan-report-card';
import UpgradeBanner from '@/components/upgrade-banner';
import WeekBlock from '@/components/week-block';
import { DATE_FORMAT } from '@/constants/date-format';
import { translate } from '@/core';
import { useDelayedRefetch } from '@/core/hooks/use-delayed-refetch';
import { useWeekNavigation } from '@/core/hooks/use-week-navigation';
import { useWeekPanSwipe } from '@/core/hooks/use-week-pan-swipe';
import { formatDate } from '@/core/utilities/format-date';
import {
  type IInterpretationRecord,
  type IInterpretationResult,
} from '@/types/interpretation-report';
import { colors, Text } from '@/ui';

const Reports = () => {
  const scrollViewRef = useRef<FlashList<any>>(null);
  const {
    i18n: { language },
  } = useTranslation();

  const {
    weekOffset,
    segmentedDays,
    interval,
    weekNumber,
    currentMonth,
    currentYear,
    initialDayFocused,
    changeWeekOffset,
    startOfWeek,
    endOfWeek,
  } = useWeekNavigation();

  const { data: interpretationData, refetch } = useInterpretationByDate({
    startDate: startOfWeek,
    endDate: endOfWeek,
    weekNumber,
    language,
  })();

  const { data: userInfo } = useUser(language);

  const {
    mutate: onUpdateInterpretationFields,
    isPending: isUpdateTitlePending,
  } = useUpdateInterpretationFields();

  const { panResponder } = useWeekPanSwipe({
    onChangeWeekOffset: changeWeekOffset,
  });
  useScrollToTop(scrollViewRef);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    });
  };

  const { isRefetching, onRefetch } = useDelayedRefetch(refetch);

  // Helper function to transform daily reports
  const transformDailyReports = (days: IInterpretationResult | null) => {
    if (!days) return [];

    return Object.entries(days).map(([dayIndex, reports]) => ({
      day: dayIndex,
      data: reports || null,
    }));
  };

  // Main sections transformation
  const getSections = (interpretationData: IInterpretationRecord) => {
    if (!interpretationData?.record) {
      return [];
    }
    // Convert object to array, sort by date, and transform data
    return Object.entries(interpretationData.record)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([month, dailyRecords]) => ({
        month,
        data: transformDailyReports(dailyRecords),
      }));
  };

  // Usage
  const sections = getSections(interpretationData);

  const onScrollToIndex = (index: number) => {
    scrollViewRef?.current?.scrollToIndex({ index, animated: true });
  };

  const records = interpretationData?.record || {};

  // Prepare flat data for FlashList
  const flashListData = useMemo(() => {
    return Object.entries(records)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) // Sort by date
      .map(([date, records]) => ({
        id: date,
        date,
        records,
      }));
  }, [records]);

  const renderItem = ({ item }) => (
    <View className="mb-2 mt-4">
      <View className="flex-row items-center rounded-md bg-slate-100 p-2 dark:bg-blackBeauty">
        <Text className="font-bold-nunito text-xl text-gray-800">
          {formatDate(item.date, DATE_FORMAT.weekDayMonth, language)}
        </Text>
      </View>

      {!item.records.length ? (
        <View className="ml-1 mt-4 rounded-lg bg-gray-50 dark:bg-blackEerie">
          <Text className="text-md text-gray-500">
            {translate('reports.noReportsAvailable')}
          </Text>
        </View>
      ) : (
        <View className="mt-4 gap-4">
          {Array.isArray(item.records) &&
            item.records.map((record: IInterpretationResult) => {
              return (
                <CardWrapper
                  key={record.id}
                  chevronColor={colors.primary[900]}
                  className="rounded-xl bg-white p-4 dark:bg-blackBeauty"
                  isEntirelyClickable
                  onPress={() =>
                    router.navigate({
                      pathname: '/scan-interpretation/[id]',
                      params: { id: record.docId },
                    })
                  }
                >
                  <ScanReportCard
                    {...record}
                    language={language}
                    isUpdateTitlePending={isUpdateTitlePending}
                    onEditTitle={(title, documentId) =>
                      onUpdateInterpretationFields({
                        documentId,
                        fieldsToUpdate: { title },
                        language,
                      })
                    }
                    dateFormat="hh:mm A"
                  />
                </CardWrapper>
              );
            })}
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-primary-50 dark:bg-blackEerie">
      <WeekBlock
        className="px-4"
        reportSections={sections}
        onScrollToIndex={onScrollToIndex}
        weekOffset={weekOffset}
        initialDayFocused={initialDayFocused}
        changeWeekOffset={changeWeekOffset}
        weekNumber={weekNumber}
        currentMonth={currentMonth}
        interval={interval}
        currentYear={currentYear}
        segmentedDays={segmentedDays}
      />

      {userInfo.scansRemaining <= 0 && (
        <UpgradeBanner
          className="mx-4 mt-6"
          onUpgradePress={() => router.navigate('/paywall')}
        />
      )}

      <FlashList
        {...panResponder.panHandlers}
        ref={scrollViewRef}
        data={flashListData}
        renderItem={renderItem}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <EndScrollPlaceholder
            className="mt-[550]"
            onScrollToTop={scrollToTop}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <>
            <ReportSkeleton />
            <ReportSkeleton />
            <ReportSkeleton />
            <ReportSkeleton />
          </>
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefetch} />
        }
      />
    </View>
  );
};

export default Reports;
