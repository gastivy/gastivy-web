import { Box, Flex, Icon, IconNames, Skeleton, Text } from "astarva-ui";
import React, { useState } from "react";

import { TypesTransactions } from "@/modules/financeApp/category/models";
import { useGetBalance } from "@/modules/financeApp/wallet/hooks/useWallet";
import { formatter } from "@/utils/formatter";

interface BalanceProps {
  onTransfer: () => void;
  onIncome: () => void;
  onExpenses: () => void;
}

export const Balance: React.FC<BalanceProps> = ({
  onIncome,
  onExpenses,
  onTransfer,
}) => {
  const isHide = localStorage.getItem("hide_balance") === "true";
  const [isHideBalance, setIsHideBalance] = useState(isHide);

  const handleShowHide = () => {
    localStorage.setItem("hide_balance", isHideBalance ? "false" : "true");
    setIsHideBalance(!isHideBalance);
  };
  const { data, isLoading, isRefetching } = useGetBalance();
  const MenuTransactions = [
    {
      label: "Income",
      value: TypesTransactions.INCOME,
      icon: "Arrow-Down-outline",
      color: "green400",
      backgroundColor: "green50",
      onClick: () => onIncome(),
    },
    {
      label: "Expenses",
      value: TypesTransactions.EXPENSES,
      icon: "Arrow-Up-outline",
      color: "red400",
      backgroundColor: "red50",
      onClick: () => onExpenses(),
    },
    {
      label: "Transfer",
      value: TypesTransactions.TRANSFER,
      icon: "Swap-Horizontal-outline",
      color: "blue400",
      backgroundColor: "blue50",
      onClick: () => onTransfer(),
    },
  ];

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="17.5rem"
      marginX="auto"
      padding="1.25rem 1.5rem"
      backgroundColor="blue400"
      borderRadius=".75rem"
      boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
      position="relative"
      overflow="hidden"
    >
      <Box
        width="25rem"
        height="25rem"
        left="-13.75rem"
        bottom="-5rem"
        borderRadius="56.25rem"
        backgroundColor="blue500"
        position="absolute"
      />

      <Box
        width="12.5rem"
        height="12.5rem"
        right="-5rem"
        top="-5rem"
        borderRadius="56.25rem"
        backgroundColor="blue300"
        position="absolute"
      />

      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="0"
        flexDirection="column"
        padding="1rem"
        gap="2rem"
      >
        <Text color="white" variant="large" weight="medium">
          Ganna Prasetya
        </Text>

        <Flex flexDirection="column">
          <Text color="white" variant="small">
            Current Balance
          </Text>

          <Flex alignItems="center" gap=".5rem">
            {isLoading || isRefetching ? (
              <Skeleton width="10rem" height="1.5rem" marginTop=".25rem" />
            ) : (
              <Text color="white" variant="heading6" weight="medium">
                {isHideBalance
                  ? "**********"
                  : formatter.currency(data?.data?.balance)}
              </Text>
            )}
            <Icon
              name={isHideBalance ? "Hide-outline" : "Eye-outline"}
              color="white"
              onClick={handleShowHide}
            />
          </Flex>
        </Flex>

        <Flex
          backgroundColor="white"
          borderRadius=".75rem"
          padding=".75rem"
          justifyContent="space-around"
        >
          {MenuTransactions.map((item, index) => {
            return (
              <Flex
                key={index}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap=".375rem"
                onClick={item.onClick}
              >
                <Flex
                  backgroundColor="blue50"
                  justifyContent="center"
                  alignItems="center"
                  height="3rem"
                  width="3rem"
                  borderRadius=".375rem"
                >
                  <Icon
                    name={item.icon as IconNames}
                    size="1.5rem"
                    color="blue400"
                  />
                </Flex>
                <Text variant="extra-small" color="blue600">
                  {item.label}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
