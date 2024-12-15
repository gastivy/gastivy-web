import { Divider, Flex, Icon, Skeleton, Text } from "astarva-ui";
import { useState } from "react";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetActivity } from "@/modules/activityApp/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activityApp/activity/models";
import { dateTime } from "@/utils/dateTime";

import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";
import { FormLogActivity } from "./components/FormLogActivity";
import { OptionsLogActivity } from "./components/OptionsLogActivity";

const ActivityContainer = () => {
  const { data, isLoading, isRefetching } = useGetActivity();
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
      const date = dateTime
        .convertToLocalTime(String(activity.start_date))
        .split("T")[0];

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
      <ConfirmDeleteModal
        isVisible={confirmDeleteModal.isOpen}
        logActivity={activitySelected}
        onClose={confirmDeleteModal.onClose}
      />

      {/* Update Log Activity */}
      <FormLogActivity
        isVisible={updateLogActivtyDrawer.isOpen}
        isEdit
        logActivity={activitySelected}
        onClose={updateLogActivtyDrawer.onClose}
      />

      {/* Add Log Activity */}
      <FormLogActivity
        isVisible={addActivityDrawer.isOpen}
        onClose={addActivityDrawer.onClose}
      />

      <Navbar title="Activity">
        <Navbar.Suffix>
          <Flex
            justifyContent="center"
            alignItems="center"
            padding=".375rem"
            backgroundColor="blue400"
            maxWidth="max-content"
            borderRadius=".375rem"
            boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
            onClick={addActivityDrawer.onOpen}
          >
            <Icon name="Plus-solid" size="1rem" color="white" />
          </Flex>
        </Navbar.Suffix>
      </Navbar>

      <Flex flexDirection="column" gap="1.25rem" padding="5rem 0">
        {isLoading || isRefetching
          ? Array.from({ length: 20 }).map((_, index: number) => (
              <Skeleton key={index} minHeight="3.125rem" />
            ))
          : getLogActivity().map((item, key) => {
              return (
                <Flex key={key} flexDirection="column" gap="1.5rem">
                  <Divider
                    align="center"
                    _textStyle={{
                      color: "black300",
                      variant: "medium",
                    }}
                  >
                    <Text variant="small">
                      {dateTime.getDate(new Date(item.key), "en-GB", {
                        dateStyle: "long",
                      })}
                    </Text>
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
                          <Text variant="small" weight="regular">
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
                              name={
                                is_done
                                  ? "Instant-outline"
                                  : "Time-Square-outline"
                              }
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
                            {dateTime.convertSecondsToTimeFormat(
                              activity.seconds
                            )}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              );
            })}
      </Flex>
    </Layout>
  );
};

export default ActivityContainer;
