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
