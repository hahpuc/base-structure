import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(date).format(format);
};

/**
 * Get relative time from now
 */
export const getRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

/**
 * Get start of day
 */
export const getStartOfDay = (date?: string | Date): string => {
  return dayjs(date).startOf('day').toISOString();
};

/**
 * Get end of day
 */
export const getEndOfDay = (date?: string | Date): string => {
  return dayjs(date).endOf('day').toISOString();
};

/**
 * Convert UTC to local timezone
 */
export const toLocalTime = (date: string | Date): string => {
  return dayjs.utc(date).local().format();
};

/**
 * Convert local time to UTC
 */
export const toUTCTime = (date: string | Date): string => {
  return dayjs(date).utc().format();
};
