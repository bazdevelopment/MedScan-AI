/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { translate } from '@/core';
import { useSegmentedSelection } from '@/core/hooks/use-segmented-selection';
import { wait } from '@/core/utilities/wait';
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
  className,
}: IWeekBlock) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { checkIsActive, handleChangeSelection, selectedOption } =
    useSegmentedSelection(initialDayFocused as ISegmentedControlOption);

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
        const indexToScrollFound = findSectionIndexToScroll(
          initialDayFocused?.subtitle as string,
          reportSections,
        );

        /**
         *  Delay added to ensure the UI has time to update before scrolling
         * TODO: maybe the check ofr indexes && can be replace with something more specific
         */

        typeof indexToScrollFound === 'number' &&
          wait(500).then(() => onScrollToIndex(indexToScrollFound));
      }
    };
    handleWeekOffsetChange();
  }, [weekOffset, reportSections?.length]);

  return (
    <>
      <View
        className={`mb-4 flex-row items-center justify-between ${className}`}
      >
        <Icon
          icon={<ChevronLeftRounded />}
          onPress={() => changeWeekOffset('left')}
          color={isDark ? colors.white : colors.black}
        />

        <View className="flex-1 items-center justify-center">
          <Text className="font-bold-nunito text-lg">{interval}</Text>

          <Text className="mt-1 font-medium-nunito text-base text-gray-600 dark:text-gray-400">{`${translate('components.WeekBlock.week')} ${weekNumber} - ${currentMonth} ${currentYear}`}</Text>
        </View>

        <Icon
          icon={<ChevronRightRounded />}
          onPress={() => changeWeekOffset('right')}
          color={isDark ? colors.white : colors.black}
        />
      </View>
      <SegmentedControl
        backgroundColor={isDark ? colors.blackEerie : colors.primary[50]}
        tabInactiveColor={isDark ? colors.blackBeauty : colors.white}
        options={segmentedDays}
        selectedOption={selectedOption as ISegmentedControlOption}
        onOptionPress={(option) => {
          handleChangeSelection(option);

          const indexToScroll = findSectionIndexToScroll(
            `${option.month}-${option.subtitle}`,
            reportSections,
          );

          typeof indexToScroll === 'number' && onScrollToIndex(indexToScroll);
        }}
        withBorder={!isDark}
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
): number => {
  return reports.findIndex((record: ISegmentedControlOption) =>
    record.month.includes(selectedDayTitle),
  );
};
