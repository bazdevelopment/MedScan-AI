import dayjs from '../../lib/dayjs';

export const formatDate = (
  dateString: string,
  dateFormat: string,
  locale: string,
) => {
  const date = dayjs(dateString).locale(locale);
  return date.format(dateFormat);
};
