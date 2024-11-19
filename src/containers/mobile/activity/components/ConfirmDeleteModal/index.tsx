import { useDeleteActivity } from "@/modules/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activity/models";
import { dateTime } from "@/utils/dateTime";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Icon, Modal, Text } from "astarva-ui";

interface Props {
  logActivity?: LogActivity;
  onClose: () => void;
}

export const ConfirmDeleteDrawer: React.FC<Props> = ({
  logActivity,
  onClose,
}) => {
  const {
    category_name,
    end_date,
    id,
    is_done,
    seconds = 0,
    start_date,
  } = logActivity || {};

  const queryClient = useQueryClient();

  const { mutate } = useDeleteActivity({
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-category"] });
      onClose();
    },
  });

  const handleDelete = () => {
    if (id) mutate(id);
  };

  return (
    <Modal
      isVisible
      verticalCentered
      padding="1.25rem"
      width="17.5rem"
      onClose={onClose}
    >
      <Flex flex={1} flexDirection="column" alignItems="center">
        <Text>Are you sure want to delete</Text>
        <Text weight="semi-bold">{category_name}?</Text>

        <Flex
          flex={1}
          width="12.5rem"
          flexDirection="column"
          gap="8px"
          padding=".75rem 0"
        >
          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="small" color="black400">
              Date
            </Text>
            <Text variant="small" color="black400">
              {dateTime.getDate(
                start_date ? new Date(String(start_date)) : new Date(),
                "en-GB",
                {
                  dateStyle: "long",
                }
              )}
            </Text>
          </Flex>

          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="small" color="black400">
              State
            </Text>
            <Flex alignItems="center" gap=".5rem">
              <Icon
                icon={is_done ? "Instant-outline" : "Clock-outline"}
                color={is_done ? "blue400" : "black300"}
                size={is_done ? "1.25rem" : "1rem"}
              />
              <Text variant="small" color={is_done ? "blue400" : "black400"}>
                {is_done ? "Done" : "Pause"}
              </Text>
            </Flex>
          </Flex>

          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="small" color="black400">
              Time
            </Text>
            <Text variant="small" color="black400">
              {dateTime.getRangeTime(String(start_date), String(end_date))}
            </Text>
          </Flex>

          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="small" color="black400">
              Seconds
            </Text>
            <Text variant="small" color="black400">
              {dateTime.convertSecondsToTimeFormat(seconds)}
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDirection="column"
          gap=".5rem"
          width="240px"
          marginTop="1.25rem"
        >
          <Button
            variant="primary"
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="red400"
            backgroundColorHover="red700"
            onClick={handleDelete}
          >
            Yes, Delete it!
          </Button>
          <Button
            variant="secondary"
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="red400"
            backgroundColorHover="red700"
            onClick={onClose}
          >
            No, Don't delete it!
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
