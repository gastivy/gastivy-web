export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const getRange = (startDay: Day = 5): { start: Date; end: Date } => {
  const today = new Date();

  /**
   * Sunday: 0
   * Monday: 1
   * Tuesday: 2
   * Wednesday: 3
   * Thursday: 4
   * Friday: 5
   * Saturday: 6
   */
  const dayOfWeek = today.getDay();

  // Calculate days since the specified start day (e.g., Friday if startDay = 5)
  const daysSinceStartDay =
    dayOfWeek >= startDay ? dayOfWeek - startDay : 7 - (startDay - dayOfWeek);

  // Set the start date to the last occurrence of the specified start day
  const start = new Date(today);
  start.setDate(today.getDate() - daysSinceStartDay);

  // Set the end date to 6 days after the start date (covers a 7-day range)
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Go to next 6 days from start day

  return { start, end };
};
