export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const dateTime = {
  getRangeWeekly(startDay: Day = 5): { start_date: string; end_date: string } {
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

    return {
      start_date: start.toISOString().split("T")[0],
      end_date: end.toISOString().split("T")[0],
    };
  },

  getDate(value?: Date, locale = "id", options?: Intl.DateTimeFormatOptions) {
    const dates = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      ...options,
    }).format(value || new Date());
    return dates;
  },

  formatTimeFromUTC(utcDateString: string): string {
    const date = new Date(utcDateString);

    const time = new Intl.DateTimeFormat("id-ID", {
      hour: "numeric",
      minute: "numeric",
    })
      .format(date)
      .split(".");

    return `${time[0]}:${time[1]}`;
  },

  getRangeTime(start: string, end: string) {
    return `${this.formatTimeFromUTC(start)} - ${this.formatTimeFromUTC(end)}`;
  },

  /**
   *
   * @param totalSeconds
   * @returns
   *
   * return: 2h 34m 34s
   */
  convertSecondsToTimeFormat(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    if (!hours && !minutes) return `${seconds}s`;
    if (!hours) return `${minutes}m ${seconds}s`;
    return `${hours}h ${minutes}m ${seconds}s`;
  },
};
