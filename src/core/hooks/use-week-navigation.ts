import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { POSITIONS, type TPositions } from '@/constants/positions';
import { type IDayOfWeek } from '@/types/date-time';

import {
  getCurrentDay,
  getCurrentMonth,
  getDaysOfWeek,
  getSegmentedDays,
  getStartAndEndWeek,
  getWeekInterval,
  getWeekNumber,
  getYearFromWeekOffset,
} from '../utilities/date-time-helpers';

/**
 * Custom hook used to handle the navigation between weeks
 */
export const useWeekNavigation = () => {
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const {
    i18n: { language },
  } = useTranslation();

  const weekNumber: number = getWeekNumber(weekOffset, language);
  const currentYear = getYearFromWeekOffset(weekOffset, language);
  const weekDates: IDayOfWeek[] = getDaysOfWeek(
    weekNumber,
    currentYear,
    language,
  );
  const currentMonth = getCurrentMonth(currentYear, weekNumber, language);
  const segmentedDays = getSegmentedDays(weekDates);
  const interval = getWeekInterval(currentYear, weekNumber, language);
  const currentDay = getCurrentDay('ddd', language);

  const { startOfWeek, endOfWeek } = getStartAndEndWeek(
    currentYear,
    weekNumber,
    language,
  );
  const initialDayFocused = segmentedDays.find(
    (day) => day.title === currentDay,
  );

  const changeWeekOffset = (iconPosition: TPositions) => {
    if (iconPosition === POSITIONS.LEFT) {
      setWeekOffset((prevOffset) => prevOffset - 1);
    }

    if (iconPosition === POSITIONS.RIGHT) {
      setWeekOffset((prevOffset) => prevOffset + 1);
    }
  };

  return {
    weekOffset,
    segmentedDays,
    interval,
    weekNumber,
    currentMonth,
    currentYear,
    currentDay,
    changeWeekOffset,
    initialDayFocused,
    startOfWeek,
    endOfWeek,
  };
};
