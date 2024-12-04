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
  formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  },

  getRangeDaily(): { start_date: string; end_date: string } {
    const today = new Date();

    return {
      start_date: this.formatDate(today),
      end_date: this.formatDate(today),
    };
  },

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
      start_date: this.formatDate(start),
      end_date: this.formatDate(end),
    };
  },

  getRangeThisMonth(
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1
  ): { start_date: string; end_date: string } {
    if (month < 1 || month > 12) {
      throw new Error("Month must be between 1 and 12.");
    }

    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);

    return {
      start_date: this.formatDate(firstDate),
      end_date: this.formatDate(lastDate),
    };
  },

  getRangeThisYear(year = new Date().getFullYear()): {
    start_date: string;
    end_date: string;
  } {
    const firstDate = new Date(year, 0, 1);
    const lastDate = new Date(year, 12, 0);

    return {
      start_date: this.formatDate(firstDate),
      end_date: this.formatDate(lastDate),
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

  convertToLocalTime(utcDateString: string): string {
    const utcDate = new Date(utcDateString);

    // Get the timezone offset in minutes and convert it to milliseconds
    const timezoneOffset = utcDate.getTimezoneOffset() * -1; // Negative for offset direction
    const localTime = new Date(utcDate.getTime() + timezoneOffset * 60 * 1000);

    // Format to ISO string but retain the 'Z' to match your desired format
    const isoString = localTime.toISOString();
    return isoString.slice(0, -1) + "Z";
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
