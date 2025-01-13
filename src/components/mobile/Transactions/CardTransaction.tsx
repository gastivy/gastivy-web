import { Box, colorIndex, Flex, Icon, Text, useDisclosure } from "astarva-ui";
import React from "react";

import { TypesTransactions } from "@/modules/financeApp/category/models";
import { Transactions } from "@/modules/financeApp/transactions/models";
import { formatter } from "@/utils/formatter";

interface CardTransactionProps {
  transaction: Transactions;
  onClick?: () => void;
}

export const CardTransaction: React.FC<CardTransactionProps> = ({
  transaction,
  onClick,
}) => {
  const descriptionDisclosure = useDisclosure({ open: false });

  const getValueTransaction = (type: TypesTransactions, value?: number) => {
    if ([TypesTransactions.INCOME, TypesTransactions.PROFIT].includes(type)) {
      return {
        color: "green400" as colorIndex,
        money: `+${formatter.currency(value)}`,
      };
    }

    if (
      [
        TypesTransactions.EXPENSES,
        TypesTransactions.FEE_TRANSFER,
        TypesTransactions.LOSS,
      ].includes(type)
    ) {
      return {
        color: "red400",
        money: `-${formatter.currency(value)}`,
      };
    }

    if (type === TypesTransactions.TRANSFER) {
      return {
        color: "black300",
        money: formatter.currency(value),
      };
    }
  };

  return (
    <Flex
      flexDirection="column"
      boxShadow="0 .0625rem .75rem .0625rem rgba(50, 132, 255, 0.1)"
      borderRadius=".5rem"
    >
      <Flex
        flex={1}
        padding=".625rem 1rem"
        justifyContent="space-between"
        onClick={onClick}
      >
        <Flex flexDirection="column" gap=".25rem">
          <Text variant="small">{transaction.name}</Text>
          <Text color="black300" variant="extra-small">
            {transaction.category_name}
          </Text>

          {[TypesTransactions.INCOME, TypesTransactions.PROFIT].includes(
            transaction.type
          ) && (
            <Text variant="extra-small" color="blue400" marginTop=".25rem">
              {transaction.to_wallet_name}
            </Text>
          )}

          {[
            TypesTransactions.EXPENSES,
            TypesTransactions.FEE_TRANSFER,
            TypesTransactions.LOSS,
          ].includes(transaction.type) && (
            <Text variant="extra-small" color="blue400" marginTop=".25rem">
              {transaction.from_wallet_name}
            </Text>
          )}

          {transaction.type === TypesTransactions.TRANSFER && (
            <Flex alignItems="center" gap=".25rem" marginTop=".25rem">
              <Text variant="extra-small" color="blue400">
                {transaction.from_wallet_name}
              </Text>
              <Icon name="Arrow-Right-outline" size="1rem" />
              <Text variant="extra-small" color="blue400">
                {transaction.to_wallet_name}
              </Text>
            </Flex>
          )}
        </Flex>
        <Text
          variant="small"
          color={getValueTransaction(transaction.type)?.color}
          weight="medium"
        >
          {getValueTransaction(transaction.type, transaction.money)?.money}
        </Text>
      </Flex>

      {transaction.description && (
        <Flex flexDirection="column">
          <Flex
            justifyContent="center"
            paddingY=".25rem"
            borderTop=".0625rem solid"
            borderColor="black100"
            borderRadius=".5rem"
            onClick={descriptionDisclosure.onToggle}
          >
            <Icon
              name={
                descriptionDisclosure.isOpen ? "Up-outline" : "Down-outline"
              }
            />
          </Flex>

          {descriptionDisclosure.isOpen && (
            <Flex padding=".625rem 1rem">
              <Box
                fontSize=".75rem"
                color="black500"
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {transaction.description}
              </Box>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
