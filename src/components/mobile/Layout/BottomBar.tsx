import { Box, Flex, Icon, IconNames, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React from "react";

import { route } from "@/constants/route";

interface BottomBarProps {
  path: string;
  name: string;
  icon: IconNames;
}

export const BottomBar: React.FC = () => {
  const { push, pathname } = useRouter();

  const menu: BottomBarProps[] = [
    {
      path: route.home.path,
      name: route.home.name,
      icon: "Grid-solid",
    },
    {
      path: route.statistic.path,
      name: route.statistic.name,
      icon: "Flame-solid",
    },
    {
      path: route.category.path,
      name: route.category.name,
      icon: "Flame-solid",
    },
    {
      path: route.activity.path,
      name: route.activity.name,
      icon: "Activity-solid",
    },
  ];
  return (
    <Flex
      position="fixed"
      bottom="1rem"
      left="1rem"
      right="1rem"
      width="calc(100% - 2rem)"
      backgroundColor="white"
      borderRadius=".75rem"
      boxShadow="0 .0625rem .75rem .0625rem rgba(50, 132, 255, 0.2)"
      overflow="hidden"
    >
      {menu.map((item, index) => {
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
              name={item.icon}
              size="1.125rem"
              color={isActive ? "blue400" : "black400"}
            />
            <Text color={isActive ? "blue400" : "black400"} variant="small">
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
