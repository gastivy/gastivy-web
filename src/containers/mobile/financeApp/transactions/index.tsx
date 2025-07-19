import {
  Flex,
  Icon,
  Select,
  Skeleton,
  Tabs,
  Text,
  useDisclosure,
} from "astarva-ui";
import { useMemo, useState } from "react";

import { Assets } from "@/assets";
import { EmptyState } from "@/components/base/EmptyState";
import { InfiniteScroll } from "@/components/base/InfiniteScroll";
import { Loading } from "@/components/base/Loading";
import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { CardTransaction } from "@/components/mobile/Transactions/CardTransaction";
import { useFilterTransactions } from "@/modules/financeApp/transactions/hooks/useFilterTransaction";
import { Transactions } from "@/modules/financeApp/transactions/models";
import { dateTime, RangeDate } from "@/utils/dateTime";

import { AddTransactionsDrawer } from "./components/AddTransactionDrawer";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";
import { FilterDrawer } from "./components/FilterDrawer";
import { OptionsLogTransaction } from "./components/OptionsLogTransaction";
import { UpdateTransactionsDrawer } from "./components/UpdateTransactionDrawer";

const TransactionsFinanceContainer = () => {
  const addTransactionDisclosure = useDisclosure({ open: false });
  const updateTransactionDrawer = useDisclosure({ open: false });
  const optionsLogTransaction = useDisclosure({ open: false });
  const confirmDeleteModal = useDisclosure({ open: false });
  const [transactionSelected, setTransactionSelected] = useState<
    Transactions | undefined
  >(undefined);

  const {
    currentRange,
    currentYear,
    optionsTab,
    yearList,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    data,
    idCategories,
    filterDisclosure,
    idsWallet,
    fetchNextPage,
    setIdsWallet,
    setIdCategories,
    refetch,
    setCurrentYear,
    setCurrentRange,
  } = useFilterTransactions();

  const transaction = useMemo(
    () => data?.pages?.flatMap((res) => res.data || []) || [],
    [data]
  );

  const getLogTransaction = () => {
    const grouped: { [key: string]: Transactions[] } = {};

    transaction.forEach((transaction) => {
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

  const handleClickTransaction = (transaction: Transactions) => {
    setTransactionSelected(transaction);
    optionsLogTransaction.onOpen();
  };

  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      {isRefetching && <Loading />}

      {/* Drawer Options Log Activity */}
      <OptionsLogTransaction
        isVisible={optionsLogTransaction.isOpen}
        onConfirmDelete={confirmDeleteModal.onOpen}
        onClose={optionsLogTransaction.onClose}
        onUpdate={updateTransactionDrawer.onOpen}
      />

      {/* Modal Confirm Delete */}
      <ConfirmDeleteModal
        isVisible={confirmDeleteModal.isOpen}
        transactionSelected={transactionSelected}
        onClose={confirmDeleteModal.onClose}
      />

      {/* Add Transactions Drawer */}
      <AddTransactionsDrawer
        isVisible={addTransactionDisclosure.isOpen}
        onRefetch={refetch}
        onBack={addTransactionDisclosure.onClose}
      />

      {/* Update Transactions Drawer */}
      <UpdateTransactionsDrawer
        transactionId={transactionSelected?.id}
        isVisible={updateTransactionDrawer.isOpen}
        onBack={updateTransactionDrawer.onClose}
      />

      {filterDisclosure.isOpen && (
        <FilterDrawer
          isVisible={filterDisclosure.isOpen}
          currentRange={currentRange}
          idCategories={idCategories}
          idWallet={idsWallet}
          onRefetch={refetch}
          onSelectIdWallet={setIdsWallet}
          onSelectIdCategory={setIdCategories}
          onSetCurrentRange={setCurrentRange}
          onClose={filterDisclosure.onClose}
        />
      )}

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
        <Flex alignItems="center" gap="1rem">
          <Flex flexDirection="column" flex={1}>
            <Select
              value={currentYear}
              size="small"
              options={yearList}
              onSelect={(option) => setCurrentYear(Number(option.value))}
            />
          </Flex>
          <Icon
            name="Filter-solid"
            color="blue400"
            onClick={filterDisclosure.onOpen}
          />
        </Flex>

        <Tabs
          activeTab={currentRange}
          options={optionsTab}
          onChange={(val) => setCurrentRange(val as RangeDate)}
        />

        <InfiniteScroll
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          flexDirection="column"
          overflowY="auto"
          hideScroll
          gap="2rem"
          maxHeight="calc(100vh - 20rem)"
          paddingX=".25rem"
          onNextPage={fetchNextPage}
        >
          {(isLoading || isRefetching) && <LoadingSkeleton />}
          {!(isLoading || isRefetching) && (transaction || []).length === 0 && (
            <EmptyState
              src={Assets.NoteEmptyState}
              width={220}
              height={220}
              title="You Have No Transactions"
              description="Create your transactions now for manage your financial"
              buttonText="Create Transactions"
              onClick={addTransactionDisclosure.onOpen}
            />
          )}{" "}
          {!(isLoading || isRefetching) &&
            (transaction || []).length > 0 &&
            getLogTransaction().map((item, index) => (
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
                        onClick={() => handleClickTransaction(transaction)}
                      />
                    );
                  })}
                </Flex>
              </Flex>
            ))}
        </InfiniteScroll>
      </Flex>
    </Layout>
  );
};

function LoadingSkeleton() {
  return (
    <Flex flexDirection="column" gap="1rem">
      {Array.from({ length: 8 }).map((_, index: number) => (
        <Skeleton height="5.625rem" key={index} />
      ))}
    </Flex>
  );
}

export default TransactionsFinanceContainer;
