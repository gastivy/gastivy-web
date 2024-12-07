import { Flex, Text } from "astarva-ui";
import React from "react";

export const Balance: React.FC = () => {
  return (
    <Flex
      flexDirection="column"
      width="80%"
      marginX="auto"
      padding="1.25rem 1.5rem"
      backgroundColor="white"
      borderRadius=".375rem"
      boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
    >
      <Text>Current Balance</Text>
      <Text>Rp 5.000.000</Text>
    </Flex>
  );
};
