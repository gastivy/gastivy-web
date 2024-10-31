import Drawer from "@/components/base/Drawer";
import useStopwatch, { Timer } from "@/hooks/useStopwatch";
import { useCreateActivity } from "@/modules/activity/hooks/useActivity";
import { Activity } from "@/modules/activity/models";
import { IndexedDB } from "@/utils/indexedDB";
import { Button, Flex, Icon, Text } from "astarva-ui";
import React, { useState } from "react";
import { ModalConfirm } from "./ModalConfirm";
import useDisclosure from "@/hooks/useDisclosure";

interface Props {
  categoryId?: string;
  title?: string;
  data?: Timer[];
  onBack: () => void;
  onRefetch: () => void;
}

export const AddActivityDrawer: React.FC<Props> = ({
  categoryId = "",
  title = "",
  data = [],
  onBack,
  onRefetch,
}) => {
  const [times, setTimes] = useState<Timer[]>(data);
  const modalConfirm = useDisclosure({ open: false });
  const timer = useStopwatch(times);
  const existingTime = times.filter((time) => time.end_date);
  const lastItem = times[times.length - 1];

  const { mutate } = useCreateActivity({
    onSuccess: async () => {
      await IndexedDB.delete("activities", categoryId);
      onBack();
      onRefetch();
    },
  });

  const updateIndexedDB = async (
    categoryId: string,
    name: string,
    data: Timer[]
  ) => {
    await IndexedDB.put("activities", { id: categoryId, data, name });
  };

  const handleStartTimer = () => {
    const data = [...existingTime, { start_date: new Date(), end_date: "" }];
    setTimes(data);
    updateIndexedDB(
      categoryId,
      title,
      data.map((item) => ({
        ...item,
        category_id: categoryId,
        is_done: false,
        description: "",
      }))
    );
  };

  const handlePauseTimer = () => {
    const data = [
      ...existingTime,
      { start_date: lastItem.start_date, end_date: new Date() },
    ];
    setTimes(data);
    updateIndexedDB(
      categoryId,
      title,
      data.map((item) => ({
        ...item,
        category_id: categoryId,
        is_done: false,
        description: "",
      }))
    );
  };

  const handleTimer = async () => {
    // Start Timer
    if (!lastItem || (lastItem?.start_date && lastItem?.end_date)) {
      handleStartTimer();
      return;
    }

    // Stop timer
    if (lastItem && !lastItem?.end_date) {
      handlePauseTimer();
      return;
    }
  };

  const handleSaveActivity = async () => {
    const rawActivities = (await IndexedDB.getAll("activities"))[0].data;
    const activities = rawActivities.map((item: Activity, index: number) => {
      return { ...item, is_done: rawActivities.length - 1 === index };
    });
    mutate({ activities: activities });
  };

  const disabled = !times.at(-1)?.end_date;

  const handleOK = async () => {
    await IndexedDB.delete("activities", categoryId);
    onBack();
    modalConfirm.onClose();
  };

  const handleBack = () => {
    if (times.length) {
      handlePauseTimer();
      modalConfirm.onOpen();
      return;
    }
    onBack();
  };

  return (
    <Drawer>
      {/* Modal Confirm */}
      <ModalConfirm
        isVisible={modalConfirm.isOpen}
        onOk={handleOK}
        onCancel={modalConfirm.onClose}
      />

      <Flex flexDirection="column" padding="1.25rem" gap="1.5rem" width="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Icon icon="Arrow-Left-solid" onClick={handleBack} />
          <Button
            variant="primary"
            shape="rounded"
            size="small"
            disabled={disabled}
            onClick={handleSaveActivity}
          >
            Done
          </Button>
        </Flex>

        <Flex flexDirection="column" alignItems="center" gap="1.5rem">
          <Text variant="heading4" color="black700">
            {title}
          </Text>
          <Flex
            height="280px"
            width="280px"
            justifyContent="center"
            alignItems="center"
            backgroundColor="blue200"
            borderRadius="280px"
            border="10px solid"
            borderColor="blue50"
          >
            <Text variant="heading3">{timer}</Text>
          </Flex>
          <Flex width="12rem">
            <Button
              size="medium"
              shape="semi-round"
              isBlock
              onClick={handleTimer}
            >
              {lastItem && !lastItem?.end_date ? "Pause" : "Start"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Drawer>
  );
};
