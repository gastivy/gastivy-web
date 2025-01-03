import { Flex, FlexProps } from "astarva-ui";

import { BottomBar } from "./BottomBar";

interface LayoutProps {
  _flex?: FlexProps;
  children: React.ReactNode;
  isShowBottomBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  _flex,
  isShowBottomBar = true,
}) => {
  return (
    <Flex width="100vw" justifyContent="center">
      <Flex
        maxWidth="48rem"
        width="100%"
        minHeight="100vh"
        flexDirection="column"
        position="relative"
        backgroundColor="white"
        padding="1rem"
        gap="1.5rem"
        {..._flex}
      >
        {children}
        {isShowBottomBar && <BottomBar />}
      </Flex>
    </Flex>
  );
};

export default Layout;
