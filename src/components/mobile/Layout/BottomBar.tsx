import { Flex, Icon, IconNames, Text } from "astarva-ui";
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
      bottom=".5rem"
      left=".5rem"
      right=".5rem"
      width="calc(100% - 1rem)"
      backgroundColor="white"
      borderRadius=".75rem"
      boxShadow="0px 1px 10px 1px rgba(50, 132, 255, 0.1)"
    >
      {menu.map((item, index) => {
        return (
          <Flex
            flexDirection="column"
            width="50%"
            padding=".5rem .375rem"
            justifyContent="center"
            alignItems="center"
            gap=".25rem"
            key={index}
            onClick={() => push(item.path)}
          >
            <Icon
              name={item.icon}
              size="1.125rem"
              color={pathname === item.path ? "blue400" : "black400"}
            />
            <Text
              color={pathname === item.path ? "blue400" : "black400"}
              variant="small"
            >
              {item.name}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
