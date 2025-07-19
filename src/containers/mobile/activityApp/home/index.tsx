import { Flex } from "astarva-ui";
import { useEffect, useState } from "react";

import { Profile } from "@/components/base/Profile";
import Layout from "@/components/mobile/Layout";
import useDisclosure from "@/hooks/useDisclosure";
import { Timer } from "@/hooks/useStopwatch";
import { Category } from "@/modules/activityApp/category/models";
import { useSummaryActivity } from "@/modules/activityApp/home/useSummaryActivity";
import { IndexedDB } from "@/utils/indexedDB";

import { AddActivityDrawer } from "./components/AddActivityDrawer";
import { SummaryActivity } from "./sections/SummaryActivity";

interface Activity {
  id: string;
  name: string;
  data: Timer[];
}

const HomeActivityContainer = () => {
  const activityDisclosure = useDisclosure({ open: false });
  const [categorySelected, setCategorySelected] = useState<Category>();
  const [dataActivity, setDataActivity] = useState<Activity>();

  const {
    currentTab,
    data,
    startDate,
    endDate,
    isLoading,
    isRefetching,
    listTab,
    refetch,
    setCurrentTab,
    handleChangeRange,
  } = useSummaryActivity();

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
  }, []);

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

      <Flex flexDirection="column" gap="1rem">
        <Profile />

        <SummaryActivity
          data={data?.data}
          currentTab={currentTab}
          isLoading={isLoading}
          isRefetching={isRefetching}
          listTab={listTab}
          startDate={startDate}
          endDate={endDate}
          onSelectCategory={selectCategory}
          onSetCurrentTab={setCurrentTab}
          onDateRange={handleChangeRange}
        />
      </Flex>
    </Layout>
  );
};

export default HomeActivityContainer;
