/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';

import {
  useInterpretationByDate,
  useUpdateInterpretationFields,
} from '@/api/interpretation/interpretation.hooks';
import CardWrapper from '@/components/card-wrapper';
import ScanReportCard from '@/components/scan-report-card';
import SkeletonLoader from '@/components/skeleton-loader';
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
import { Text } from '@/ui';

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

  const {
    mutate: onUpdateInterpretationFields,
    isPending: isUpdateTitlePending,
  } = useUpdateInterpretationFields()();
  const { panResponder } = useWeekPanSwipe({
    onChangeWeekOffset: changeWeekOffset,
  });
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

  // useScrollToTop(scrollViewRef);

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
      <Text className="mb-2 font-bold-nunito text-xl text-gray-800">
        {formatDate(item.date, DATE_FORMAT.weekDayMonth, language)}
      </Text>

      {!item.records.length ? (
        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="text-base text-gray-500">
            {translate('reports.noReportsAvailable')}
          </Text>
        </View>
      ) : (
        <View className="mt-4">
          {Array.isArray(item.records) &&
            item.records.map((record: IInterpretationResult) => {
              return (
                <CardWrapper
                  key={record.id}
                  isEntirelyClickable
                  onPress={() =>
                    router.push({
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
                  />
                </CardWrapper>
              );
            })}
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1">
      <WeekBlock
        className="mt-6"
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
      <FlashList
        {...panResponder.panHandlers}
        ref={scrollViewRef}
        data={flashListData}
        renderItem={renderItem}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 550,
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={SkeletonLoader}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefetch} />
        }
      />
    </View>
  );
};

export default Reports;
