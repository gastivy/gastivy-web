import { Flex, FlexProps } from "astarva-ui";
import React, { ReactNode } from "react";

interface DrawerProps extends FlexProps {
  children?: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ children, ...props }) => {
  return (
    <Flex
      position="fixed"
      zIndex="10"
      backgroundColor="overlay50"
      bottom="0"
      left="0"
      height="100dvh"
      width="100%"
      alignItems="flex-end"
    >
      <Flex backgroundColor="white" width="100%" height="100%" {...props}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Drawer;
