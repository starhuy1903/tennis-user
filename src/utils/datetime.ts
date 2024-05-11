import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import moment from 'moment';

dayjs.extend(relativeTime);

export const displayTimestamp = (
  timestamp: string,
  options?: {
    includeRelativeTimeToPresent?: boolean;
  }
) => {
  const time = dayjs(timestamp);
  return `${time.format('YYYY-MM-DD HH:mm:ss')}${options?.includeRelativeTimeToPresent ? `(${time.fromNow()})` : ''}`;
};

export const displayDateTime = ({
  dateTime,
  formatSpecification,
  targetFormat,
}: {
  dateTime: string;
  formatSpecification?: string;
  targetFormat: string;
}) => {
  const t = moment(dateTime, formatSpecification);
  return t.format(targetFormat);
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

export const checkExpiredDate = (end: string) => {
  const endDate = moment(end);
  const now = moment();
  return endDate.isBefore(now);
};
