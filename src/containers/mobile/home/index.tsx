import Layout from "@/components/mobile/Layout";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetCategory } from "@/modules/category/hooks/useCategory";
import { Flex, Text, Progress } from "astarva-ui";
import { AddActivityDrawer } from "./components/AddActivityDrawer";
import { useEffect, useState } from "react";
import { IndexedDB } from "@/utils/indexedDB";
import { Timer } from "@/hooks/useStopwatch";
import { getRange } from "@/utils/getRange";
import { Category } from "@/modules/category/models";

const HomeContainer = () => {
  const { data, isLoading, refetch } = useGetCategory();
  const activityDisclosure = useDisclosure({ open: false });
  const [categorySelected, setCategorySelected] = useState<Category>();
  const [dataActivity, setDataActivity] = useState<Timer[]>([]);

  const selectCategory = async (category: Category) => {
    setCategorySelected(category);
    activityDisclosure.onOpen();
  };

  // Get From IndexedDB
  const getActivityExisting = async () => {
    const activity = (await IndexedDB.getAll("activities"))[0];
    if (activity?.data?.length) {
      setCategorySelected(activity.id);
      setDataActivity(activity.data);
      activityDisclosure.onOpen();
    }
  };

  console.log("RANGE", getRange());

  const handleBackAddActivity = () => {
    activityDisclosure.onClose();
    refetch();
  };

  useEffect(() => {
    getActivityExisting();
  }, []);

  return (
    <Layout>
      {activityDisclosure.isOpen && (
        <AddActivityDrawer
          title={categorySelected?.name}
          categoryId={categorySelected?.id || ""}
          data={dataActivity}
          onBack={handleBackAddActivity}
        />
      )}
      <Flex flexDirection="column">
        <Text variant="small" color="black500">
          Good Morning
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
                    color="greenyellow400"
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
