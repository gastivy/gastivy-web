import { Flex, ScrollBar, Text } from "astarva-ui";
import { useEffect, useRef } from "react";

import { lodash } from "@/utils/lodash";

export interface RangeDate {
  start_date: string;
  end_date: string;
}

interface ListTabs {
  label: string;
  value: RangeDate;
}

interface TabsProps {
  currentTab: RangeDate;
  listTab: ListTabs[];
  onSetCurrentTab: (key: RangeDate) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  currentTab,
  listTab,
  onSetCurrentTab,
}) => {
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = listTab.findIndex((item) =>
      lodash.isObjectEqual(item.value, currentTab)
    );
    if (activeIndex !== -1 && tabRefs.current[activeIndex]) {
      tabRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }, [currentTab, listTab]);

  return (
    <ScrollBar overflowX="auto" hideScroll gap=".5rem">
      {listTab.map((item, index) => {
        const isActive = lodash.isObjectEqual(item.value, currentTab);
        return (
          <Flex
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            key={index}
            justifyContent="center"
            alignItems="center"
            padding=".25rem 1.5rem"
            borderRadius="2.5rem"
            backgroundColor={isActive ? "blue400" : "white"}
            border=".0625rem solid"
            borderColor="blue400"
            onClick={() => onSetCurrentTab(item.value)}
          >
            <Text
              variant="small"
              color={isActive ? "white" : "blue400"}
              weight="medium"
            >
              {item.label}
            </Text>
          </Flex>
        );
      })}
    </ScrollBar>
  );
};
