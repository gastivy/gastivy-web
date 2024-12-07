import { Flex, Progress, ScrollBar, Skeleton, Text } from "astarva-ui";
import React from "react";

import { Category } from "@/modules/activityApp/category/models";
import { ListTab } from "@/modules/activityApp/home/useSummaryActivity";

interface SummaryActivityProps {
  data?: Category[];
  isLoading: boolean;
  listTab: ListTab[];
  currentTab: string;
  rangeDay: number;
  onSetCurrentTab: (tab: string) => void;
  onSelectCategory: (category: Category) => void;
}

export const SummaryActivity: React.FC<SummaryActivityProps> = ({
  currentTab,
  data = [],
  isLoading,
  listTab,
  rangeDay,
  onSelectCategory,
  onSetCurrentTab,
}) => {
  return (
    <Flex
      flexDirection="column"
      borderTopRightRadius="1.5rem"
      borderTopLeftRadius="1.5rem"
      flex={1}
      gap="1rem"
    >
      <Text variant="large" weight="medium">
        Weekly Plan
      </Text>

      <ScrollBar overflowX="auto" hideScroll gap=".5rem">
        {listTab.map((item, index) => (
          <Flex
            key={index}
            justifyContent="center"
            alignItems="center"
            padding=".25rem 1.5rem"
            borderRadius="2.5rem"
            backgroundColor={item.value === currentTab ? "blue400" : "white"}
            border=".0625rem solid"
            borderColor="blue400"
            onClick={() => onSetCurrentTab(item.value)}
          >
            <Text
              variant="small"
              color={item.value === currentTab ? "white" : "blue400"}
              weight="medium"
            >
              {item.name}
            </Text>
          </Flex>
        ))}
      </ScrollBar>

      <ScrollBar
        flexDirection="column"
        gap="1rem"
        maxHeight="27.5rem"
        overflowY="auto"
        paddingRight=".75rem"
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => {
              return <Skeleton key={index} minHeight="6.25rem" />;
            })
          : data.map(({ minutes = 0, target = 0, ...item }, key) => {
              const totalTarget = target * rangeDay;
              const difference = minutes - totalTarget;
              return (
                <Flex
                  flexDirection="column"
                  backgroundColor="blue50"
                  padding=".625rem"
                  borderRadius=".625rem"
                  key={key}
                  gap=".75rem"
                  onClick={() => onSelectCategory({ ...item, minutes, target })}
                >
                  <Text variant="medium" color="black900">
                    {item.name}
                  </Text>
                  <Flex flexDirection="column" gap=".25rem">
                    <Flex justifyContent="space-between">
                      <Text color="black400" variant="small">
                        {minutes} / {totalTarget} Minutes
                      </Text>
                      <Text
                        color={difference < 0 ? "red400" : "blue400"}
                        variant="small"
                      >
                        {difference < 0 ? difference : `+${difference}`} m
                      </Text>
                    </Flex>
                    <Progress.Bar
                      width="100%"
                      color="blue400"
                      backgroundColor="white"
                      withoutLimit
                      textInside={false}
                      height=".75rem"
                      _text={{
                        color: "black700",
                      }}
                      percent={Math.round((minutes / totalTarget) * 100)}
                    />
                  </Flex>
                </Flex>
              );
            })}
      </ScrollBar>
    </Flex>
  );
};
