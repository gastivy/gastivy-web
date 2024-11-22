import Layout from "@/components/mobile/Layout";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetCategory } from "@/modules/category/hooks/useCategory";
import { Flex, Text, Progress } from "astarva-ui";
import { AddActivityDrawer } from "./components/AddActivityDrawer";
import { useEffect, useMemo, useState } from "react";
import { IndexedDB } from "@/utils/indexedDB";
import { Timer } from "@/hooks/useStopwatch";
import { Category } from "@/modules/category/models";
import { dateTime } from "@/utils/dateTime";

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

  const greeting = () => {
    const today = new Date();
    const hours = today.getHours();

    if (hours >= 0 && hours < 11) return "Good morning";
    if (hours >= 11 && hours < 17) return "Good afternoon";
    if (hours >= 17 && hours < 22) return "Good evening";
    return "Good night";
  };

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

      <Flex flexDirection="column" gap=".5rem">
        <Text variant="medium" color="black500">
          {greeting()}
        </Text>
        <Text variant="large" weight="bold" color="black800">
          Ganna Prasetya
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        borderTopRightRadius="1.5rem"
        borderTopLeftRadius="1.5rem"
        flex={1}
        gap="1rem"
      >
        <Text weight="bold">Weekly Plan</Text>

        <Flex flexDirection="column" gap="1rem">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            data?.data.map(({ minutes = 0, target = 0, ...item }, key) => {
              return (
                <Flex
                  flexDirection="column"
                  backgroundColor="white"
                  padding=".625rem"
                  borderRadius=".625rem"
                  key={key}
                  gap=".75rem"
                  onClick={() => selectCategory({ ...item, minutes, target })}
                >
                  <Flex flexDirection="column" gap=".25rem">
                    <Text>{item.name}</Text>
                    <Text color="black400" variant="small">
                      {target} Menit
                    </Text>
                  </Flex>
                  <Progress.Bar
                    width="100%"
                    color="blue400"
                    percent={Math.round((minutes / target) * 100)}
                  />
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
