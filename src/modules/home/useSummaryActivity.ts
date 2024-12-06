import { useState } from "react";

import { dateTime } from "@/utils/dateTime";

import { useGetCategory } from "../category/hooks/useCategory";

interface Range {
  start_date?: string;
  end_date?: string;
}

export interface ListTab {
  name: string;
  value: string;
  range: Range;
  day: number;
}

export const useSummaryActivity = () => {
  const [currentTab, setCurrentTab] = useState("all");

  const rangeDaily = dateTime.getRangeDaily();
  const rangeWeekly = dateTime.getRangeWeekly();
  const rangeMonthly = dateTime.getRangeThisMonth();
  const rangeYearly = dateTime.getRangeThisYear();

  const today = new Date();
  const listTab: ListTab[] = [
    { name: "All", value: "all", range: {}, day: 1 },
    { name: "Daily", value: "day", range: rangeDaily, day: 1 },
    { name: "Weekly", value: "week", range: rangeWeekly, day: 7 },
    {
      name: "Monthly",
      value: "month",
      range: rangeMonthly,
      day: new Date(today.getFullYear(), today.getMonth() + 1, 29).getDate(),
    },
    {
      name: "Yearly",
      value: "year",
      range: rangeYearly,
      day: new Date(today.getFullYear(), 1, 29).getDate() === 29 ? 366 : 365,
    },
  ];
  const selectedTypeSummary = listTab.find((item) => item.value === currentTab);

  const { data, isLoading, refetch } = useGetCategory({
    ...selectedTypeSummary?.range,
  });

  return {
    currentTab,
    data,
    isLoading,
    listTab,
    selectedTypeSummary,
    refetch,
    setCurrentTab,
  };
};
