import { type ISegmentedControlOption } from '@/components/segmented-control/segmented-control.interface';
import { type IDayOfWeek } from '@/types/date-time';

import dayjs from '../../lib/dayjs';

/**
 * Utility function used to get the week number based on week offset
 */
export const getWeekNumber = (weekOffset: number): number => {
  const currentDate = dayjs();
  const targetDate = currentDate.add(weekOffset, 'week');
  return targetDate.isoWeek();
};

/**
 * Function to get an array of abbreviated day names for a specific week number and offset
 * The array will look like [{"Mon":28}, {"Tue":"29"}, ...]
 *
 */
export const getDaysOfWeek = (
  weekNumber: number,
  year: number,
): IDayOfWeek[] => {
  const startOfWeek = dayjs().year(year).isoWeek(weekNumber).startOf('isoWeek'); // Get the start of the specified week with offset
  const endOfWeek = dayjs().year(year).isoWeek(weekNumber).endOf('isoWeek'); // Get the end of the specified week with offset: ;
  const daysOfWeek = [];

  let currentDay = startOfWeek;
  while (currentDay.isSameOrBefore(endOfWeek)) {
    daysOfWeek.push({
      [currentDay.format('ddd')]: {
        day: currentDay.date(),
        month:
          currentDay.month() < 9
            ? `0${currentDay.month() + 1}`
            : currentDay.month() + 1,
      }, // Abbreviated day name as key, day number as value
    });
    currentDay = currentDay.add(1, 'day'); // Move to the next day
  }

  return daysOfWeek;
};

/**
 * Utility function used to get a specific year based on week offset
 */
export const getYearFromWeekOffset = (weekOffset: number): number => {
  const date = dayjs().add(weekOffset, 'weeks');
  return date.isoWeekYear();
};

/**
 * Utility function used to create a basic structure by mapping all the days from a week
 */
export const getSegmentedDays = (
  weekDates: IDayOfWeek[],
): ISegmentedControlOption[] => {
  const mappedDays = weekDates.map((day, index) => {
    const [dayName, { day: dayNumber, month }] = Object.entries(day)[0];
    return {
      title: dayName,
      subtitle: dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`,
      id: index,
      month,
    };
  });
  return mappedDays;
};

/**
 * Utility function used to get the current month of the current week also considering year
 */
export const getCurrentMonth = (year: number, weekNumber: number): string => {
  const currentDate = dayjs().year(year).week(weekNumber);
  return currentDate.format('MMMM');
};

/**
 * Utility function which returns a string with the interval of the week
 * E.g for the week between 22 and 28 april it will show => 22.04 - 28.04
 */
export const getWeekInterval = (year: number, weekNumber: number): string => {
  const startOfWeek = dayjs().year(year).isoWeek(weekNumber).startOf('isoWeek'); // Get the start of the specified week with offset
  const endOfWeek = dayjs().year(year).isoWeek(weekNumber).endOf('isoWeek'); // Get the end of the specified week with offset: ;

  const formatStartOfWeek = startOfWeek.format('DD.MM');
  const formatEndOfWeek = endOfWeek.format('DD.MM');

  return `${formatStartOfWeek} - ${formatEndOfWeek}`;
};

/**
 * Utility function used to get the current day in ddd format like "Mon"
 */
export const getCurrentDay = (format: string): string => dayjs().format(format);

/**
 * Utility function which returns the start and end week
 */
export const getStartAndEndWeek = (
  year: number,
  weekNumber: number,
): { startOfWeek: string; endOfWeek: string } => {
  const startOfWeek = dayjs()
    .year(year)
    .isoWeek(weekNumber)
    .startOf('isoWeek')
    .format('YYYY-MM-DD'); // Format the start of the week to "YYYY-MM-DD"

  const endOfWeek = dayjs()
    .year(year)
    .isoWeek(weekNumber)
    .endOf('isoWeek')
    .format('YYYY-MM-DD'); // Format the end of the week to "YYYY-MM-DD"

  return { startOfWeek, endOfWeek };
};

/* Function that checks if a date of format "2024-06-23" is today  */
export const checkIsToday = (date: string) => {
  const today = dayjs().format('YYYY-MM-DD');
  const isToday = dayjs(date).isSame(today, 'day');

  return isToday;
};
