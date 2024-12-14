import { Flex, Icon, Text, useDisclosure } from "astarva-ui";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { CardTransaction } from "@/components/mobile/Transactions/CardTransaction";
import { useGetTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";
import { Transactions } from "@/modules/financeApp/transactions/models";
import { dateTime } from "@/utils/dateTime";

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

  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
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
            padding=".375rem"
            backgroundColor="blue400"
            maxWidth="max-content"
            borderRadius=".375rem"
            boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
            onClick={addTransactionDisclosure.onOpen}
          >
            <Icon name="Plus-solid" size="1rem" color="white" />
          </Flex>
        </Navbar.Suffix>
      </Navbar>

      <Flex flexDirection="column" paddingTop="5rem" gap="2rem">
        {getLogTransaction().map((item, index) => {
          return (
            <Flex flexDirection="column" key={index} gap=".75rem">
              <Text variant="small" color="black700">
                {dateTime.getDate(new Date(item.key), "en-GB", {
                  dateStyle: "long",
                })}
              </Text>

              <Flex flexDirection="column" gap=".5rem">
                {item.log.map((transaction, indexTransaction) => {
                  return (
                    <CardTransaction
                      transaction={transaction}
                      key={indexTransaction}
                    />
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
