import dayjs from 'dayjs';

export const formatDate = (dateString: string, dateFormat: string) => {
  const date = dayjs(dateString);
  return date.format(dateFormat);
};
