import { type ISegmentedControlOption } from '@/components/segmented-control/segmented-control.interface';
import { type IDayOfWeek } from '@/types/date-time';

import dayjs from '../../lib/dayjs';

/**
 * Utility function used to get the week number based on week offset
 */
export const getWeekNumber = (weekOffset: number, locale: string): number => {
  const currentDate = dayjs().locale(locale);
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
  locale: string,
): IDayOfWeek[] => {
  // Explicitly calculate a date from the given year and week
  const baseDate = dayjs(`${year}-01-01`) // Start with January 1st of the given year
    .locale(locale)
    .startOf('year') // Start of the year
    .add(weekNumber - 1, 'weeks') // Navigate to the correct week
    .startOf('isoWeek'); // Ensure alignment to the ISO week start

  const startOfWeek = baseDate;
  const endOfWeek = baseDate.endOf('isoWeek');

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
export const getYearFromWeekOffset = (
  weekOffset: number,
  locale: string,
): number => {
  const date = dayjs().locale(locale).add(weekOffset, 'weeks');
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
export const getCurrentMonth = (
  year: number,
  weekNumber: number,
  locale: string,
): string => {
  const currentDate = dayjs().locale(locale).year(year).week(weekNumber);
  return currentDate.format('MMMM');
};

/**
 * Utility function which returns a string with the interval of the week
 * E.g for the week between 22 and 28 april it will show => 22.04 - 28.04
 */
export const getWeekInterval = (
  year: number,
  weekNumber: number,
  locale: string,
): string => {
  // Explicitly calculate a date from the given year and week
  const baseDate = dayjs(`${year}-01-01`) // Start with January 1st of the given year
    .locale(locale)
    .startOf('year') // Start of the year
    .add(weekNumber - 1, 'weeks') // Navigate to the correct week
    .startOf('isoWeek'); // Ensure alignment to the ISO week start

  const formatStartOfWeek = baseDate.format('DD.MM'); // Start of the week
  const formatEndOfWeek = baseDate.endOf('isoWeek').format('DD.MM'); // End of the week

  return `${formatStartOfWeek} - ${formatEndOfWeek}`;
};

/**
 * Utility function used to get the current day in ddd format like "Mon"
 */
export const getCurrentDay = (format: string, locale: string): string =>
  dayjs().locale(locale).format(format);

/**
 * Utility function which returns the start and end week
 */
export const getStartAndEndWeek = (
  year: number,
  weekNumber: number,
  locale: string,
): { startOfWeek: string; endOfWeek: string; locale: string } => {
  // Explicitly calculate a date from the given year and week
  const baseDate = dayjs(`${year}-01-01`) // Start with January 1st of the given year
    .locale(locale)
    .startOf('year') // Start of the year
    .add(weekNumber - 1, 'weeks') // Navigate to the correct week
    .startOf('isoWeek'); // Ensure alignment to the ISO week start

  const startOfWeek = baseDate.format('YYYY-MM-DD'); // Start of the week
  const endOfWeek = baseDate.endOf('isoWeek').format('YYYY-MM-DD'); // End of the week

  return { startOfWeek, endOfWeek, locale };
};
/* Function that checks if a date of format "2024-06-23" is today  */
export const checkIsToday = (date: string, locale: string) => {
  const today = dayjs().locale(locale).format('YYYY-MM-DD');
  const isToday = dayjs(date).locale(locale).isSame(today, 'day');

  return isToday;
};
