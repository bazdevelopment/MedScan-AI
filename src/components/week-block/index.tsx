/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSegmentedSelection } from '@/core/hooks/use-segmented-selection';
import { colors, Text } from '@/ui';
import { ChevronLeftRounded, ChevronRightRounded } from '@/ui/assets/icons';

import Icon from '../icon';
import SegmentedControl from '../segmented-control';
import { type ISegmentedControlOption } from '../segmented-control/segmented-control.interface';
import { type IWeekBlock } from './week-block.interface';

/**
 * Component used do display segmented tab bar for handling weekly navigation
 */
const WeekBlock = ({
  reportSections,
  onScrollToIndex,
  weekOffset,
  initialDayFocused,
  changeWeekOffset,
  weekNumber,
  currentMonth,
  interval,
  currentYear,
  segmentedDays,
}: IWeekBlock) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { checkIsActive, handleChangeSelection, selectedOption } =
    useSegmentedSelection(initialDayFocused);

  /**
   * When user navigation to the current week I want the current day to be selected
   */
  useEffect(() => {
    const handleWeekOffsetChange = () => {
      if (weekOffset !== 0) {
        handleChangeSelection(null);
        onScrollToIndex(0, 0);
      } else {
        handleChangeSelection(initialDayFocused as ISegmentedControlOption);
        // const indexes = findSectionIndexToScroll(
        //   initialDayFocused?.subtitle,
        //   reportSections,
        // );

        /**
         *  Delay added to ensure the UI has time to update before scrolling
         * TODO: maybe the check ofr indexes && can be replace with something more specific
         */
        // wait(500).then(() =>
        //   onScrollToIndex(indexes[0]?.sectionIndex, indexes[0]?.itemIndex),
        // );
      }
    };
    handleWeekOffsetChange();
  }, [weekOffset, reportSections?.length]);

  return (
    <>
      <View className="mb-4 flex-row items-center justify-between">
        <Icon
          icon={<ChevronLeftRounded />}
          iconContainerStyle="ml-4"
          onPress={() => changeWeekOffset('left')}
          color={isDark ? colors.white : colors.black}
        />

        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-bold">{interval}</Text>

          <Text className="font-primary text-lg">{`Week ${weekNumber} - ${currentMonth} ${currentYear}`}</Text>
        </View>

        <Icon
          icon={<ChevronRightRounded />}
          iconContainerStyle="mr-4"
          onPress={() => changeWeekOffset('right')}
          color={isDark ? colors.white : colors.black}
        />
      </View>
      <SegmentedControl
        options={segmentedDays}
        selectedOption={selectedOption as ISegmentedControlOption}
        onOptionPress={(option) => {
          handleChangeSelection(option);

          // const indexes = findSectionIndexToScroll(
          //   `${option.month}-${option.subtitle}`,
          //   data,
          // );
          // indexes?.length &&
          //   onScrollToIndex(indexes[0].sectionIndex, indexes[0].itemIndex);
        }}
        withBorder
        borderColor={colors.primary[300]}
        spacing={8}
        checkIsActive={checkIsActive}
      />
    </>
  );
};

export default WeekBlock;

/**
 * Utility function used to find the section index and element index to scroll
 * slice(8) to extract the last 2 characters from "20-12-22"
 */
const findSectionIndexToScroll = (
  selectedDayTitle: string,
  reports: any,
): { sectionIndex: number; itemIndex: number }[] => {
  return true;
};
