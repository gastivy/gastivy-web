import React, { ReactElement } from "react";

import { useWindowSize } from "@/hooks/useWindowSize";

import { LoadingSpinner } from "../LoadingSpinner";

type Props = {
  mobile: ReactElement;
  web: ReactElement;
};

export const PageRender: React.FC<Props> = ({ mobile, web }) => {
  const { width = 0 } = useWindowSize();

  if (!width) return <LoadingSpinner />;
  if (width < 768) return mobile;
  return web;
};
