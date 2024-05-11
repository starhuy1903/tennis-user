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

// 120 => 2:00
// 90 => 1:30
export const displayHour = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
};

// Input: 2023-10-29 12:00:00
// Now: 2023-10-29 11:30:00
// Output: 00:30:00
export const displayDistanceFromNow = (date: string) => {
  const time = moment(date);
  const now = moment();
  const duration = moment.duration(now.diff(time));
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
