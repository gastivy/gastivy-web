import { route } from "@/constants/route";
import { Flex, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React from "react";

export const BottomBar: React.FC = () => {
  const router = useRouter();
  const menu = [route.home, route.category];
  return (
    <Flex
      position="fixed"
      bottom=".5rem"
      left=".5rem"
      right=".5rem"
      width="calc(100% - 1rem)"
      backgroundColor="white"
      borderRadius="2.5rem"
    >
      {menu.map((item, index) => {
        return (
          <Flex
            width="50%"
            padding="1.25rem 1rem"
            justifyContent="center"
            alignItems="center"
            key={index}
            onClick={() => router.push(item.path)}
          >
            <Text color="black400">{item.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
