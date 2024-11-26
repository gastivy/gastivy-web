import { Flex, Progress, Text } from "astarva-ui";
import { useEffect, useState } from "react";

import Layout from "@/components/mobile/Layout";
import useDisclosure from "@/hooks/useDisclosure";
import { Timer } from "@/hooks/useStopwatch";
import { useGetCategory } from "@/modules/category/hooks/useCategory";
import { Category } from "@/modules/category/models";
import { dateTime } from "@/utils/dateTime";
import { IndexedDB } from "@/utils/indexedDB";

import { AddActivityDrawer } from "./components/AddActivityDrawer";

interface Activity {
  id: string;
  name: string;
  data: Timer[];
}

const HomeContainer = () => {
  const activityDisclosure = useDisclosure({ open: false });
  const [categorySelected, setCategorySelected] = useState<Category>();
  const [dataActivity, setDataActivity] = useState<Activity>();

  const rangeWeekly = dateTime.getRangeWeekly();
  const { data, isLoading, refetch } = useGetCategory({
    ...rangeWeekly,
  });

  const selectCategory = async (category: Category) => {
    setCategorySelected(category);
    activityDisclosure.onOpen();
  };

  // Get From IndexedDB
  const getActivityExisting = async () => {
    const activity = (await IndexedDB.getAll("activities"))[0];
    setDataActivity(activity);
    if (activity?.data?.length) {
      activityDisclosure.onOpen();
    }
  };

  const handleBackAddActivity = () => {
    activityDisclosure.onClose();
    refetch();
  };

  useEffect(() => {
    if (!activityDisclosure.isOpen) {
      getActivityExisting();
    }
  }, [activityDisclosure.isOpen]);

  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      {/* Add Activity Drawer */}
      <AddActivityDrawer
        isVisible={activityDisclosure.isOpen}
        title={categorySelected?.name || dataActivity?.name}
        categoryId={categorySelected?.id || dataActivity?.id}
        data={dataActivity?.data}
        onRefetch={refetch}
        onBack={handleBackAddActivity}
      />

      <Flex flexDirection="column">
        <Text variant="heading6" weight="medium" color="black700">
          Hi, Ganna
        </Text>
        <Text
          variant="small"
          color="black700"
        >{`Let's make this day productive`}</Text>
      </Flex>
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

        <Flex
          flexDirection="column"
          gap="1rem"
          maxHeight="18.75rem"
          overflowY="auto"
          paddingRight=".75rem"
        >
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            data?.data.map(({ minutes = 0, target = 0, ...item }, key) => {
              const difference = minutes - target;
              return (
                <Flex
                  flexDirection="column"
                  backgroundColor="blue50"
                  padding=".625rem"
                  borderRadius=".625rem"
                  key={key}
                  gap=".75rem"
                  onClick={() => selectCategory({ ...item, minutes, target })}
                >
                  <Text variant="medium" color="black900">
                    {item.name}
                  </Text>
                  <Flex flexDirection="column" gap=".25rem">
                    <Flex justifyContent="space-between">
                      <Text color="black400" variant="small">
                        {minutes} / {target} Minutes
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
                      percent={Math.round((minutes / target) * 100)}
                    />
                  </Flex>
                </Flex>
              );
            })
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default HomeContainer;
