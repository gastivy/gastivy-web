import { Flex, Icon, Select, Tabs, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React, { useState } from "react";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import { useGetDetailCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import { TypesTransactions } from "@/modules/financeApp/category/models";
import { dateTime, RangeDate } from "@/utils/dateTime";

import { LogTransactions } from "./components/LogTransactions";

const CategoryDetailTransactionContainer: React.FC = () => {
  const { query, push } = useRouter();
  const [currentRange, setCurrentRange] = useState<Partial<RangeDate>>({});
  const [currentYear, setCurrentYear] = useState<number>(0);

  const optionsTab = [
    { label: "All", value: {} },
    ...dateTime.generateMonths(currentYear),
  ];

  const yearList = [
    { label: "All The Time", value: 0 },
    ...dateTime
      .generateYears(2010)
      .sort((a, b) => b - a)
      .map((year) => ({ label: String(year), value: year })),
  ];

  const { data } = useGetDetailCategoryTransaction(query.categoryId as string);
  const { name, type } = data?.data || {};
  const isHideButton = [
    TypesTransactions.FEE_TRANSFER,
    TypesTransactions.TRANSFER,
    TypesTransactions.LOSS,
    TypesTransactions.PROFIT,
  ].includes(type as TypesTransactions);

  return (
    <Layout isShowBottomBar={false} _flex={{ padding: 0 }}>
      <Navbar
        title={name}
        onBack={() => push(route.financeApp.category.path)}
      />

      <Flex flexDirection="column">
        <Flex
          justifyContent="center"
          alignItems="center"
          marginTop="64px"
          height="10rem"
          backgroundColor="blue50"
        >
          <Icon name="Coins-outline" color="blue400" size="5rem" />
        </Flex>

        <Flex
          flex={1}
          flexDirection="column"
          gap=".75rem"
          padding="2rem 1rem 1rem"
        >
          <Select
            value={currentYear}
            size="small"
            options={yearList}
            onSelect={(option) => setCurrentYear(Number(option.value))}
          />

          <Tabs
            activeTab={currentRange}
            options={optionsTab}
            onChange={(val) => setCurrentRange(val as RangeDate)}
          />
        </Flex>

        <LogTransactions
          currentRange={currentRange}
          isHideButton={isHideButton}
        />

        {!isHideButton && (
          <Flex
            gap="1.25rem"
            padding="1rem"
            position="fixed"
            bottom="0"
            width="100%"
            backgroundColor="white"
            boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
          >
            <Flex
              flex={1}
              justifyContent="center"
              alignItems="center"
              gap=".5rem"
              padding=".25rem .75rem"
              backgroundColor="white"
              border=".0625rem solid"
              borderColor="blue400"
              borderRadius=".25rem"
            >
              <Text variant="extra-small" color="blue400">
                Delete
              </Text>
              <Icon name="Trash-outline" size="1rem" color="blue400" />
            </Flex>
            <Flex
              flex={1}
              justifyContent="center"
              alignItems="center"
              gap=".5rem"
              padding=".25rem .75rem"
              backgroundColor="blue400"
              borderRadius=".25rem"
            >
              <Text variant="extra-small" color="white">
                Edit
              </Text>
              <Icon name="Edit-outline" size="1rem" color="white" />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};

export default CategoryDetailTransactionContainer;
