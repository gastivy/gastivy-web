import { Box, Flex, Skeleton, Text } from "astarva-ui";
import { useRouter } from "next/router";

import { Assets } from "@/assets";
import { EmptyState } from "@/components/base/EmptyState";
import { CardTransaction } from "@/components/mobile/Transactions/CardTransaction";
import { route } from "@/constants/route";
import { useGetTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";

export const Transactions = () => {
  const router = useRouter();
  const { data, isLoading, isRefetching } = useGetTransactions({ limit: 5 });
  return (
    <Flex flexDirection="column" gap="1rem">
      <Flex justifyContent="space-between">
        <Text>Last Transactions</Text>
        {(data?.data || []).length > 0 && (
          <Box
            cursor="pointer"
            onClick={() => router.push(route.financeApp.transactions.path)}
          >
            <Text color="blue400">See All</Text>
          </Box>
        )}
      </Flex>

      <Flex flexDirection="column" gap=".5rem">
        {(isLoading || isRefetching) && <LoadingSkeleton />}

        {!(isLoading || isRefetching) && (data?.data || []).length === 0 && (
          <EmptyState
            src={Assets.NoteEmptyState}
            width={220}
            height={220}
            title="You Have No Transactions"
            description="Create your transactions now for manage your financial"
            buttonText="Create Transactions"
            paddingBottom="6.25rem"
            onClick={() => router.push(route.financeApp.transactions.path)}
          />
        )}

        {!(isLoading || isRefetching) &&
          (data?.data || []).length > 0 &&
          data?.data?.map((transaction, index) => (
            <CardTransaction key={index} transaction={transaction} />
          ))}
      </Flex>
    </Flex>
  );
};

function LoadingSkeleton() {
  return (
    <Flex flexDirection="column" gap=".5rem">
      {Array.from({ length: 4 }).map((_, index: number) => (
        <Skeleton key={index} height="6.25rem" />
      ))}
    </Flex>
  );
}
