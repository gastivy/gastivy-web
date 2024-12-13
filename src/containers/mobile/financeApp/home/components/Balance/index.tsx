import { Box, Flex, Icon, IconNames, Text } from "astarva-ui";
import React from "react";

import { MenuTransactions } from "@/constants/transactions";

export const Balance: React.FC = () => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="280px"
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
        zIndex="1"
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
          <Text color="white" variant="heading6" weight="medium">
            Rp 5.000.000
          </Text>
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
