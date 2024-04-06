import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import moment from 'moment';

dayjs.extend(relativeTime);

export function formatDate(isoDate: string) {
  const date = moment(isoDate);
  return date.format('DD/MM/YYYY');
}

export function formatDateTime(isoDate: string) {
  const date = moment(isoDate);
  return date.format('DD/MM/YYYY HH:mm:ss');
}

export const displayTimestamp = (timestamp: string) => {
  const time = dayjs(timestamp);
  return `${time.format('YYYY-MM-DD HH:mm:ss')} (${time.fromNow()})`;
};

// 29 Oct 2023
export const displayDate = (date: string) => {
  const time = moment(date);
  return time.format('DD MMM YYYY');
};

// Feb 15 - Feb 20, 2024
export const displayDateRange = (start: string, end: string) => {
  const startDate = moment(start);
  const endDate = moment(end);
  return `${startDate.format('MMM DD')} - ${endDate.format('MMM DD, YYYY')}`;
};

export const displayDayLeft = (end: string) => {
  const endDate = moment(end);
  const now = moment();
  if (endDate.isBefore(now)) return 'Expired';
  return `${endDate.fromNow(true).charAt(0).toUpperCase()}${endDate.fromNow(true).slice(1)} left`;
};
