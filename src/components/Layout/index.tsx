import { Flex, FlexProps } from "astarva-ui";

interface LayoutProps {
  _flex?: FlexProps;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, _flex }) => {
  return (
    <Flex width="100vw" justifyContent="center" backgroundColor="black50">
      <Flex
        maxWidth="768px"
        width="100%"
        height="100vh"
        flexDirection="column"
        backgroundColor="white"
        {..._flex}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
