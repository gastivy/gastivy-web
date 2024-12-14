import { Box, Flex, Text } from "astarva-ui";
import { useRouter } from "next/router";

import { CardTransaction } from "@/components/mobile/Transactions/CardTransaction";
import { route } from "@/constants/route";
import { useGetTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";

export const Transactions = () => {
  const router = useRouter();
  const { data } = useGetTransactions({ limit: 5 });
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
        {data?.data?.map((transaction, index) => {
          return <CardTransaction key={index} transaction={transaction} />;
        })}
      </Flex>
    </Flex>
  );
};
