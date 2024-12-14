import { colorIndex, Flex, Icon, Text, useDisclosure } from "astarva-ui";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { TypesTransactions } from "@/modules/financeApp/category/models";
import { useGetTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";
import { Transactions } from "@/modules/financeApp/transactions/models";
import { dateTime } from "@/utils/dateTime";
import { formatter } from "@/utils/formatter";

import { AddTransactionsDrawer } from "./components/AddTransactionDrawer";

const TransactionsFinanceContainer = () => {
  const addTransactionDisclosure = useDisclosure({ open: false });
  const { data } = useGetTransactions();

  const getLogTransaction = () => {
    const grouped: { [key: string]: Transactions[] } = {};

    data?.data.forEach((transaction) => {
      const date = dateTime
        .convertToLocalTime(String(transaction.date))
        .split("T")[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });

    return Object.keys(grouped).map((date) => ({
      key: date,
      log: grouped[date],
    }));
  };

  const getValueTransaction = (type: TypesTransactions, value?: number) => {
    if (type === TypesTransactions.INCOME) {
      return {
        color: "green400" as colorIndex,
        money: `+${formatter.currency(value)}`,
      };
    }

    if (
      [TypesTransactions.EXPENSES, TypesTransactions.FEE_TRANSFER].includes(
        type
      )
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
    <Layout _flex={{ paddingBottom: "88px" }}>
      {/* Add Transactions Drawer */}
      <AddTransactionsDrawer
        isVisible={addTransactionDisclosure.isOpen}
        onBack={addTransactionDisclosure.onClose}
      />

      <Navbar title="Transactions">
        <Navbar.Suffix>
          <Flex
            justifyContent="center"
            alignItems="center"
            padding="6px"
            backgroundColor="blue400"
            maxWidth="max-content"
            borderRadius="6px"
            boxShadow="0 4px 8px 0 rgba(50, 132, 255, 0.25)"
            onClick={addTransactionDisclosure.onOpen}
          >
            <Icon name="Plus-solid" size="16px" color="white" />
          </Flex>
        </Navbar.Suffix>
      </Navbar>

      <Flex flexDirection="column" paddingTop="80px" gap="2rem">
        {getLogTransaction().map((item, index) => {
          return (
            <Flex flexDirection="column" key={index} gap="12px">
              <Text variant="small" color="black700">
                {dateTime.getDate(new Date(item.key), "en-GB", {
                  dateStyle: "long",
                })}
              </Text>

              <Flex flexDirection="column" gap="8px">
                {item.log.map((transaction, indexTransaction) => {
                  return (
                    <Flex
                      key={indexTransaction}
                      boxShadow="0 1px 12px 1px rgba(50, 132, 255, 0.1)"
                      padding=".5rem 16px"
                      borderRadius="8px"
                      justifyContent="space-between"
                    >
                      <Flex flexDirection="column" gap="4px">
                        <Text variant="small">{transaction.name}</Text>
                        <Text color="black300" variant="extra-small">
                          {transaction.category_name}
                        </Text>

                        {TypesTransactions.INCOME === transaction.type && (
                          <Text
                            variant="extra-small"
                            color="blue400"
                            marginTop=".25rem"
                          >
                            {transaction.to_wallet_name}
                          </Text>
                        )}

                        {[
                          TypesTransactions.EXPENSES,
                          TypesTransactions.FEE_TRANSFER,
                        ].includes(transaction.type) && (
                          <Text
                            variant="extra-small"
                            color="blue400"
                            marginTop=".25rem"
                          >
                            {transaction.from_wallet_name}
                          </Text>
                        )}

                        {transaction.type === TypesTransactions.TRANSFER && (
                          <Flex
                            alignItems="center"
                            gap=".25rem"
                            marginTop=".25rem"
                          >
                            <Text variant="extra-small" color="blue400">
                              {transaction.from_wallet_name}
                            </Text>
                            <Icon name="Arrow-Right-outline" size="16px" />
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
                        {
                          getValueTransaction(
                            transaction.type,
                            transaction.money
                          )?.money
                        }
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Layout>
  );
};

export default TransactionsFinanceContainer;
