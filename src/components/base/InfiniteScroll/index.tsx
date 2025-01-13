import { FlexProps, ScrollBar } from "astarva-ui";
import React, { ReactNode, useRef } from "react";

interface InfiniteScrollProps extends FlexProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  children: ReactNode;
  hideScroll?: boolean;
  onNextPage: () => void;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  isFetchingNextPage,
  hasNextPage,
  children,
  onNextPage,
  ...props
}) => {
  const refScrollView = useRef<HTMLDivElement>(null);

  const onScrollItem = (event: React.ChangeEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const isBottom = Math.round(scrollHeight - scrollTop) - 5 <= clientHeight;

    if (!isFetchingNextPage && isBottom && hasNextPage) {
      onNextPage();
    }
  };

  return (
    <ScrollBar ref={refScrollView} onScroll={onScrollItem} {...props}>
      {children}
    </ScrollBar>
  );
};
