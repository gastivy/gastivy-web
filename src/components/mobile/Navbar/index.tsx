import { Box, Flex, Icon, Text } from "astarva-ui";
import React, { ReactNode, useEffect, useState } from "react";

import {
  NavbarContentProps,
  NavbarPrefixProps,
  NavbarProps,
  NavbarSuffixProps,
} from "./Navbar.types";

const Navbar: React.FC<NavbarProps> & {
  Prefix: React.FC<NavbarPrefixProps>;
  Content: React.FC<NavbarContentProps>;
  Suffix: React.FC<NavbarSuffixProps>;
} = ({ children, title, onBack }) => {
  const [scrollY, setScrollY] = useState(0);

  let prefix: ReactNode = null;
  let suffix: ReactNode = null;
  let content: ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === NavbarPrefix) prefix = child;
    if (child.type === NavbarContent) content = child;
    if (child.type === NavbarSuffix) suffix = child;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      boxShadow={
        scrollY > 20 ? "0 .0625rem .25rem 0 rgba(50, 132, 255, 0.25)" : ""
      }
      backgroundColor="white"
      zIndex={5}
    >
      {/* Prefix or Handle Back */}
      {prefix ? (
        prefix
      ) : onBack ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          padding=".25rem"
          borderRadius=".5rem"
          boxShadow="0 .0625rem .625rem 0 rgba(50, 132, 255, 0.25)"
          onClick={onBack}
        >
          <Icon name="Left-outline" />
        </Flex>
      ) : (
        <Box width="2rem" height="2rem" />
      )}

      {/* Title or Children */}
      {content ? (
        content
      ) : title ? (
        <Text
          textAlign="center"
          weight="medium"
          variant="large"
          color="black800"
        >
          {title}
        </Text>
      ) : (
        <Box width="2rem" height="2rem" />
      )}

      {/* Suffix */}
      {suffix || <Box width="2rem" height="2rem" />}
    </Flex>
  );
};

const NavbarPrefix: React.FC<NavbarPrefixProps> = ({ children }) => children;
const NavbarContent: React.FC<NavbarSuffixProps> = ({ children }) => children;
const NavbarSuffix: React.FC<NavbarSuffixProps> = ({ children }) => children;

Navbar.Prefix = NavbarPrefix;
Navbar.Suffix = NavbarSuffix;
Navbar.Content = NavbarContent;

export { Navbar };
