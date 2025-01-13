import { Disclosure, Flex, Icon, Skeleton, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { InfiniteScroll } from "@/components/base/InfiniteScroll";
import { CardTransaction } from "@/components/mobile/Transactions/CardTransaction";
import { useDisclosureProps } from "@/hooks/useDisclosure";
import { useInfiniteTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";
import { Transactions } from "@/modules/financeApp/transactions/models";
import { dateTime, RangeDate } from "@/utils/dateTime";

interface Props {
  currentRange?: RangeDate;
  isHideButton: boolean;
}

export const LogTransactions: React.FC<Props> = ({
  isHideButton,
  currentRange,
}) => {
  const router = useRouter();
  const categoryId = (router.query.categoryId as string) || "";

  const { isLoading, isFetchingNextPage, data, hasNextPage, fetchNextPage } =
    useInfiniteTransactions(
      {
        ...currentRange,
        ...(categoryId && { category_ids: [categoryId] }),
      },
      {
        enabled: Boolean(currentRange),
        queryKey: ["infinite-transactions", currentRange],
        retry: 0,
        getNextPageParam: (lastPage) => {
          const { current_page = 1, total_pages = 1 } =
            lastPage.pagination || {};
          if (current_page < total_pages) {
            return current_page + 1;
          } else {
            return undefined;
          }
        },
        initialPageParam: 1,
      }
    );

  const transaction = useMemo(
    () => data?.pages?.flatMap((res) => res.data || []) || [],
    [data]
  );

  const getLogTransaction = () => {
    const grouped: { [key: string]: Transactions[] } = {};

    transaction?.forEach((transaction) => {
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
    <Disclosure defaultOpen={true}>
      {({ isOpen, onToggle }: useDisclosureProps) => (
        <Flex flexDirection="column" position="relative">
          <Flex
            width="100%"
            position={isOpen ? "sticky" : "relative"}
            top={isOpen ? "4rem" : "0"}
            zIndex="6"
            padding="1rem"
            backgroundColor="white"
          >
            <Flex
              flex={1}
              padding=".5rem"
              justifyContent="space-between"
              alignItems="center"
              borderBottom=".0625rem solid"
              borderColor="black100"
              onClick={onToggle}
            >
              <Text variant="small">Log Transactions</Text>
              <Icon name={isOpen ? "Up-outline" : "Down-outline"} />
            </Flex>
          </Flex>

          {isOpen && (
            <InfiniteScroll
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              overflowY="auto"
              maxHeight="calc(100vh - 21rem)"
              flexDirection="column"
              gap="1.5rem"
              padding="1rem .5rem 1rem 1rem"
              marginBottom={isHideButton ? "1rem" : "5rem"}
              onNextPage={fetchNextPage}
            >
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                getLogTransaction()?.map((item, index) => {
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
                })
              )}
              {isFetchingNextPage && (
                <Text textAlign="center" color="black400">
                  Loading...
                </Text>
              )}
            </InfiniteScroll>
          )}
        </Flex>
      )}
    </Disclosure>
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
