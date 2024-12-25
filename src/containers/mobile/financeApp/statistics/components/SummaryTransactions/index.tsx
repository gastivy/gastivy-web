import { colorIndex, Divider, Flex, Select, Text } from "astarva-ui";
import { useEffect, useState } from "react";

import { TypesTransactions } from "@/modules/financeApp/category/models";
import { useSummaryCategoryTransactions } from "@/modules/financeApp/statistics/hooks/useStatisticsFinance";
import { dateTime } from "@/utils/dateTime";
import { formatter } from "@/utils/formatter";

import { RangeDate, Tabs } from "../Tabs";
import { BarChart } from "./BarChart";
import PieChart from "./PieChart";

interface RowDataProps {
  label: string;
  value: string;
  color?: colorIndex;
}

export const SummaryTransactions = () => {
  const [currentRange, setCurrentRange] = useState<RangeDate>();
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data } = useSummaryCategoryTransactions(
    { ...currentRange },
    {
      enabled: Boolean(currentRange),
      queryKey: ["summary-transaction-by-category", currentRange],
    }
  );

  const yearList = dateTime
    .generateYears(2020)
    .map((year) => ({ label: String(year), value: year }));
  const monthList = dateTime.generateMonths(currentYear);

  const incomeTypes = [TypesTransactions.INCOME, TypesTransactions.PROFIT];
  const expenseTypes = [
    TypesTransactions.EXPENSES,
    TypesTransactions.FEE_TRANSFER,
    TypesTransactions.LOSS,
  ];

  const income =
    data?.data
      .filter((wallet) => incomeTypes.includes(wallet.type))
      .reduce((sum, wallet) => sum + wallet.money, 0) || 0;

  const expenses =
    data?.data
      .filter((transaction) => expenseTypes.includes(transaction.type))
      .reduce((sum, wallet) => sum + wallet.money, 0) || 0;

  useEffect(() => {
    const thisMonth = monthList[new Date().getMonth()];
    setCurrentRange(thisMonth.value);
  }, [currentYear]);

  return (
    <Flex flexDirection="column" paddingTop="5rem" gap="1rem">
      <Select
        value={currentYear}
        size="small"
        options={yearList}
        onSelect={(option) => setCurrentYear(Number(option.value))}
      />
      {currentRange && (
        <Tabs
          currentTab={currentRange}
          listTab={monthList}
          onSetCurrentTab={(val) => {
            console.log(val);
            setCurrentRange(val);
          }}
        />
      )}

      <Text variant="medium">Summary Transaction</Text>

      <Flex
        flexDirection="column"
        boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
        padding="1rem"
        borderRadius=".5rem"
        gap=".75rem"
      >
        {data?.data?.map((item) => {
          return (
            <RowData
              label={item.name}
              value={formatter.currency(item.money)}
              key={item.id}
            />
          );
        })}
        <Divider backgroundColor="black400" height=".0625rem" />
        <Flex flexDirection="column" gap=".25rem">
          <RowData label="Income" value={formatter.currency(income)} />
          <RowData
            label="Expenses"
            value={formatter.currency(expenses * -1)}
            color="red400"
          />
        </Flex>
        <Divider backgroundColor="black400" height=".0625rem" />
        <RowData
          label="Balance"
          color="blue400"
          value={formatter.currency(income - expenses)}
        />
      </Flex>

      <PieChart data={data?.data || []} />
      <BarChart data={data?.data || []} />
    </Flex>
  );
};

function RowData({ color = "black900", label, value }: RowDataProps) {
  return (
    <Flex>
      <Flex width="60%">
        <Text color="black600" variant="small">
          {label}
        </Text>
      </Flex>
      <Text variant="small" color={color}>
        {value}
      </Text>
    </Flex>
  );
}
