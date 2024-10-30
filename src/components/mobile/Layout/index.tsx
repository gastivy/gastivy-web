import { Flex, FlexProps } from "astarva-ui";
import { BottomBar } from "./BottomBar";

interface LayoutProps {
  _flex?: FlexProps;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, _flex }) => {
  return (
    <Flex width="100vw" justifyContent="center" backgroundColor="black50">
      <Flex
        maxWidth="48rem"
        width="100%"
        height="100vh"
        flexDirection="column"
        position="relative"
        backgroundColor="#F7F6FA"
        // backgroundColor="white"
        padding="1rem"
        gap="1.5rem"
        {..._flex}
      >
        {children}
        <BottomBar />
      </Flex>
    </Flex>
  );
};

export default Layout;
