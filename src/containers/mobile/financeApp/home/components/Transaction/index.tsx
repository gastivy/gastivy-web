import { Box, Flex, Skeleton, Text } from "astarva-ui";
import { useRouter } from "next/router";

import { CardTransaction } from "@/components/mobile/Transactions/CardTransaction";
import { route } from "@/constants/route";
import { useGetTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";

export const Transactions = () => {
  const router = useRouter();
  const { data, isLoading } = useGetTransactions({ limit: 5 });
  return (
    <Flex flexDirection="column" gap="1rem">
      <Flex justifyContent="space-between">
        <Text>Last Transactions</Text>
        <Box
          cursor="pointer"
          onClick={() => router.push(route.financeApp.transactions.path)}
        >
          <Text color="blue400">See All</Text>
        </Box>
      </Flex>

      <Flex flexDirection="column" gap=".5rem">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.data?.map((transaction, index) => {
            return <CardTransaction key={index} transaction={transaction} />;
          })
        )}
      </Flex>
    </Flex>
  );
};

function LoadingSkeleton() {
  return (
    <Flex flexDirection="column" gap=".5rem">
      {Array.from({ length: 5 }).map((_, index: number) => (
        <Skeleton key={index} height="6.25rem" />
      ))}
    </Flex>
  );
}
