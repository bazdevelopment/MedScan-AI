/* eslint-disable max-lines-per-function */
import { useScrollToTop } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  type SectionList,
  View,
} from 'react-native';

import ReportOverviewCard from '@/components/report-overview-card';
import WeekBlock from '@/components/week-block';
import { useWeekNavigation } from '@/core/hooks/use-week-navigation';
import { checkIsToday } from '@/core/utilities/date-time-helpers';
import { Text } from '@/ui';
import HorizontalLine from '@/ui/horizontal-line';

import dayjs from '../../lib/dayjs';

const SWIPE_THRESHOLD = 100;
const screenWidth = Dimensions.get('window').width;

const data = {
  record: {
    '2024-01': {
      '2024-01-01': [
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
      ],
      '2024-01-02': [
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
      ],
    },
    '2024-02': {
      '2024-02-14': [
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
      ],
    },
    '2024-03': {
      '2024-03-07': [
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
      ],
      '2024-11-28': [
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
        {
          interpretation:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          question: 'Tell me about the bones',
          image: 'https://picsum.photos/200/300',
          createdAt: '2024-01-01T08:00:00Z',
        },
      ],
    },
  },
};

const Reports = () => {
  const scrollViewRef = useRef<SectionList>(null);
  // useScrollToTop(scrollViewRef);

  // const { resetHeader } = useScrollContext();

  const pan = useRef(new Animated.Value(0)).current;
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

  const [isAnimating, setIsAnimating] = useState(false);

  // const { data, refetch: onRefetchWeeklyReports } = useCurrentWeeklyReports(
  //   startOfWeek.format('YYYY-MM-DD'),
  //   endOfWeek.format('YYYY-MM-DD'),
  // );

  const sections =
    data?.record &&
    Object.entries(data.record).map(([month, days]) => {
      const sectionData = Object.entries(days).map(([day, reports]) => ({
        day,
        data: reports ? reports : null,
      }));

      return {
        month,
        data: sectionData,
      };
    });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
      },
      onPanResponderMove: Animated.event([null, { dx: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (isAnimating) return;

        const { dx } = gestureState;
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          setIsAnimating(true);

          Animated.timing(pan, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            pan.setValue(0);
            setIsAnimating(false);
            changeWeekOffset(dx > 0 ? 'left' : 'right');
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useScrollToTop(scrollViewRef);

  // useRefreshOnFocus(onRefetchWeeklyReport);

  const onScrollToIndex = (sectionIndex: number, itemIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToLocation({ sectionIndex, itemIndex });
    }
  };

  const renderReportItem = ({ item }: { item }) => {
    const isCurrentDayFocused = checkIsToday(item.day);

    return (
      <>
        <ReportOverviewCard
          report={item}
          isCurrentDayFocused={isCurrentDayFocused}
        />
        <HorizontalLine />
      </>
    );
  };

  const renderSectionHeader = ({ section }: { section: any }) => {
    return (
      <Text className="bg-slate-100 p-4 text-lg font-bold">
        {dayjs(section.month).format('dddd DD MMMM')}
      </Text>
    );
  };

  return (
    <View className="mt-14 flex-1">
      <Text className="mb-4 ml-4 text-3xl font-bold">Reports</Text>
      {/* <SpinnerScreen /> */}
      <WeekBlock
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

      {!!sections && (
        <Animated.SectionList
          {...panResponder.panHandlers}
          contentContainerStyle={{
            paddingBottom: 500,
          }}
          showsVerticalScrollIndicator={false}
          className="mt-4 flex-1"
          ref={scrollViewRef}
          keyExtractor={(item) => String(item.createdAt)}
          renderItem={renderReportItem}
          renderSectionHeader={renderSectionHeader}
          sections={sections}
        />
      )}
    </View>
  );
};

export default Reports;
