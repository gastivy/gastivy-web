import { Divider, Flex, Icon, Text } from "astarva-ui";
import { useState } from "react";

import Layout from "@/components/mobile/Layout";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetActivity } from "@/modules/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activity/models";
import { dateTime } from "@/utils/dateTime";

import { ConfirmDeleteDrawer } from "./components/ConfirmDeleteModal";
import { FormLogActivity } from "./components/FormLogActivity";
import { OptionsLogActivity } from "./components/OptionsLogActivity";

const ActivityContainer = () => {
  const { data, refetch } = useGetActivity();
  const [activitySelected, setActivitySelected] = useState<
    LogActivity | undefined
  >(undefined);
  const optionsLogActivity = useDisclosure({ open: false });
  const confirmDeleteModal = useDisclosure({ open: false });
  const updateLogActivtyDrawer = useDisclosure({ open: false });
  const addActivityDrawer = useDisclosure({ open: false });

  const getLogActivity = () => {
    const grouped: { [key: string]: LogActivity[] } = {};

    data?.data.forEach((activity) => {
      const date = activity.start_date.toString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(activity);
    });

    return Object.keys(grouped).map((date) => ({
      key: date,
      logActivity: grouped[date],
    }));
  };

  const handleClickActivity = (activity: LogActivity) => {
    setActivitySelected(activity);
    optionsLogActivity.onOpen();
  };

  return (
    <Layout>
      {/* Drawer Options Log Activity */}
      <OptionsLogActivity
        isVisible={optionsLogActivity.isOpen}
        onConfirmDelete={confirmDeleteModal.onOpen}
        onClose={optionsLogActivity.onClose}
        onUpdateActivity={updateLogActivtyDrawer.onOpen}
      />

      {/* Modal Confirm Delete */}
      <ConfirmDeleteDrawer
        isVisible={confirmDeleteModal.isOpen}
        logActivity={activitySelected}
        onClose={confirmDeleteModal.onClose}
      />

      {/* Update Log Activity */}
      <FormLogActivity
        isVisible={updateLogActivtyDrawer.isOpen}
        isEdit
        onRefetch={refetch}
        logActivity={activitySelected}
        onClose={updateLogActivtyDrawer.onClose}
      />

      {/* Add Log Activity */}
      <FormLogActivity
        isVisible={addActivityDrawer.isOpen}
        onRefetch={refetch}
        onClose={addActivityDrawer.onClose}
      />
      <Flex>
        <Text>Activity</Text>
      </Flex>

      <Flex flexDirection="column" gap="1.25rem" paddingBottom="5rem">
        {getLogActivity().map((item, key) => {
          return (
            <Flex key={key} flexDirection="column" gap="1.5rem">
              <Divider
                align="center"
                _textStyle={{
                  color: "black300",
                  variant: "medium",
                }}
              >
                {dateTime.getDate(new Date(item.key), "en-GB", {
                  dateStyle: "long",
                })}
              </Divider>
              {item.logActivity.map(({ is_done, ...activity }, index) => {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    key={index}
                    gap=".25rem"
                    onClick={() =>
                      handleClickActivity({ is_done, ...activity })
                    }
                  >
                    <Flex justifyContent="space-between" gap=".25rem">
                      <Text variant="small" weight="medium">
                        {activity.category_name}
                      </Text>
                      <Text variant="small" italic color="black600">
                        {dateTime.getRangeTime(
                          String(activity.start_date),
                          String(activity.end_date)
                        )}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Flex alignItems="center" gap=".5rem">
                        <Icon
                          name={is_done ? "Instant-outline" : "Clock-outline"}
                          color={is_done ? "blue400" : "black300"}
                          size={is_done ? "1.25rem" : "1rem"}
                        />
                        <Text
                          variant="small"
                          color={is_done ? "blue400" : "black400"}
                        >
                          {is_done ? "Done" : "Pause"}
                        </Text>
                      </Flex>
                      <Text color="black400" variant="small">
                        {dateTime.convertSecondsToTimeFormat(activity.seconds)}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          );
        })}
      </Flex>

      <Flex
        padding=".75rem"
        backgroundColor="blue400"
        maxWidth="max-content"
        borderRadius="3.125rem"
        boxShadow="0rem .25rem .5rem 0rem rgba(50, 132, 255, 0.25)"
        position="fixed"
        bottom="5.625rem"
        right="1.25rem"
        onClick={addActivityDrawer.onOpen}
      >
        <Icon name="Plus-solid" size="1.25rem" color="white" />
      </Flex>
    </Layout>
  );
};

export default ActivityContainer;
