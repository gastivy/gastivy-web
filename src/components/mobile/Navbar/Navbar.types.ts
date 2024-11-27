import { PropsWithChildren } from "react";

export interface NavbarProps {
  showBoxShadow?: boolean;
  title?: string;
  children?: React.ReactNode;
  onBack?: () => void;
}

export interface NavbarPrefixProps extends PropsWithChildren {}
export interface NavbarContentProps extends PropsWithChildren {}
export interface NavbarSuffixProps extends PropsWithChildren {}
