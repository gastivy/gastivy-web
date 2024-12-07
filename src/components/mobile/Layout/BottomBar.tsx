import { Box, Flex, Icon, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React from "react";

import { menuActivityApp, menuFinanceApp } from "@/constants/bottomBar";

export const BottomBar: React.FC = () => {
  const { push, pathname } = useRouter();

  const getBottomBar = () => {
    if (pathname.includes("activity-app")) return menuActivityApp;
    if (pathname.includes("finance-app")) return menuFinanceApp;
    return [];
  };

  return (
    <Flex
      position="fixed"
      bottom="1rem"
      left=".75rem"
      right=".75rem"
      width="calc(100% - 1.5rem)"
      backgroundColor="white"
      borderRadius=".75rem"
      boxShadow="0 .0625rem .75rem .0625rem rgba(50, 132, 255, 0.2)"
      overflow="hidden"
    >
      {getBottomBar().map((item, index) => {
        const isActive = pathname === item.path;
        return (
          <Flex
            position="relative"
            flexDirection="column"
            width="50%"
            padding=".625rem .75rem"
            justifyContent="center"
            alignItems="center"
            gap=".25rem"
            key={index}
            onClick={() => push(item.path)}
          >
            <Icon
              name={isActive ? item.iconActive : item.icon}
              size="1.125rem"
              color={isActive ? "blue400" : "black400"}
            />
            <Text color={isActive ? "blue400" : "black400"} variant="micro">
              {item.name}
            </Text>

            {isActive && (
              <Box
                width="80%"
                height=".5rem"
                borderRadius="1.25rem"
                position="absolute"
                bottom="-0.3125rem"
                backgroundColor="blue500"
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};
