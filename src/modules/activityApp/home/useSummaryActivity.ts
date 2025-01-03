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
}

export const useSummaryActivity = () => {
  const [currentTab, setCurrentTab] = useState("all");

  const rangeDaily = dateTime.getRangeDaily();
  const rangeWeekly = dateTime.getRangeWeekly();
  const rangeMonthly = dateTime.getRangeThisMonth();
  const rangeYearly = dateTime.getRangeThisYear();

  const listTab: ListTab[] = [
    { name: "All", value: "all", range: {} },
    { name: "Daily", value: "day", range: rangeDaily },
    { name: "Weekly", value: "week", range: rangeWeekly },
    {
      name: "Monthly",
      value: "month",
      range: rangeMonthly,
    },
    {
      name: "Yearly",
      value: "year",
      range: rangeYearly,
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
