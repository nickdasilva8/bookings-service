import dayjs from 'dayjs';

// ToDo :: This should come from a config file
const minutesForLock = 2;

/**
 * Function to determine is "last_updated" of seat is older than x amount of time.
 */
export const determineIfSeatCanBeUnlocked = (date: string): boolean =>
  dayjs(date).isBefore(dayjs().subtract(minutesForLock, 'minute'));
