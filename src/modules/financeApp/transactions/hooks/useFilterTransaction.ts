import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "astarva-ui";
import { useEffect, useState } from "react";

import { dateTime, RangeDate } from "@/utils/dateTime";

import { useGetTransactions } from "./useTransaction";

export const useFilterTransactions = () => {
  const queryClient = useQueryClient();
  const [currentRange, setCurrentRange] = useState<RangeDate>();
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [idCategories, setIdCategories] = useState<string[]>([]);
  const [idsWallet, setIdsWallet] = useState<string[]>([]);
  const filterDisclosure = useDisclosure({ open: false });
  const yearList = dateTime
    .generateYears(2020)
    .map((year) => ({ label: String(year), value: year }));

  const monthList = dateTime.generateMonths(currentYear);

  const { isLoading, isRefetching, data, refetch } = useGetTransactions(
    {
      ...currentRange,
      ...(idCategories.length > 0 && { category_ids: idCategories }),
      ...(idsWallet.length > 0 && { wallet_ids: idsWallet }),
    },
    {
      enabled: Boolean(currentRange),
      queryKey: ["transactions", currentRange],
    }
  );

  useEffect(() => {
    const thisMonth = monthList[new Date().getMonth()];
    setCurrentRange(thisMonth.value);
  }, [currentYear]);

  useEffect(() => {
    if (currentRange) {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    }
  }, [currentRange, idCategories, idsWallet]);

  return {
    currentRange,
    currentYear,
    data,
    filterDisclosure,
    idCategories,
    idsWallet,
    isLoading,
    isRefetching,
    monthList,
    yearList,
    refetch,
    setCurrentRange,
    setCurrentYear,
    setIdCategories,
    setIdsWallet,
  };
};
