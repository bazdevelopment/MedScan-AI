import dayjs from 'dayjs';

export const getTimeUntilMidnight = (): TimeUntilMidnight => {
  const now = dayjs();
  const midnight = dayjs().endOf('day'); // Local midnight

  const diff = midnight.diff(now, 'second');
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  // const _seconds = diff % 60;

  return { hours, minutes };
};

interface TimeUntilMidnight {
  hours: number;
  minutes: number;
}
