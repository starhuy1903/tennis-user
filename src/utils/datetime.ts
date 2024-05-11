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

export function formatTimeDate(isoDate: string) {
  const date = moment(isoDate);
  return date.format('HH:mm DD/MM/YYYY');
}

export const displayTimestamp = (
  timestamp: string,
  options?: {
    includeRelativeTimeToPresent?: boolean;
  }
) => {
  const time = dayjs(timestamp);
  return `${time.format('YYYY-MM-DD HH:mm:ss')}${options?.includeRelativeTimeToPresent ? ` (${time.fromNow()})` : ''}`;
};

// 7:30 PM
export const displayTime = (time: string) => {
  const t = moment(time, 'HH:mm:ss');
  return t.format('hh:mm A');
};

// 29 Oct 2023
export const displayDate = (date: string) => {
  const time = moment(date);
  return time.format('DD MMM YYYY');
};

// 29 Oct 2023 12:00 PM
export const displayDateTime = (date: string) => {
  const time = moment(date);
  return time.format('DD MMM YYYY hh:mm A');
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
