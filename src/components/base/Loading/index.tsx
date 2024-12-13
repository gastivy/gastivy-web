import { Flex, Text } from "astarva-ui";
import Image from "next/image";
import React from "react";

import LoadingGIF from "./loading.gif";

export const Loading: React.FC = () => {
  return (
    <Flex
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      backgroundColor="overlay50"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="white"
        padding="0 1.25rem 1rem"
        minWidth="12.5rem"
        width="50%"
        maxWidth="17.5rem"
        borderRadius=".625rem"
      >
        <Image src={LoadingGIF} height={64} width={64} alt="Loading" />
        <Text>Loading...</Text>
      </Flex>
    </Flex>
  );
};
