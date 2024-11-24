import {
  useCreateActivity,
  useUpdateActivity,
} from "@/modules/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activity/models";
import { useGetListCategory } from "@/modules/category/hooks/useCategory";
import {
  Button,
  Drawer,
  Flex,
  Icon,
  Input,
  Option,
  Select,
  Switch,
  Text,
} from "astarva-ui";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

interface UpdateLogActivityProps {
  logActivity?: LogActivity;
  isEdit?: boolean;
  isVisible: boolean;
  onRefetch: () => void;
  onClose: () => void;
}

interface FormActivity {
  categorySelected: Option["value"];
  startDate: Date | null;
  isDone: boolean;
}

export const FormLogActivity: React.FC<UpdateLogActivityProps> = ({
  logActivity,
  isEdit = false,
  isVisible,
  onClose,
  onRefetch,
}) => {
  const { mutate } = useUpdateActivity({
    onSuccess: () => {
      onClose();
      onRefetch();
    },
  });

  const { mutate: addActivity } = useCreateActivity({
    onSuccess: async () => {
      onClose();
      onRefetch();
    },
  });
  const { data } = useGetListCategory();
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [form, setForm] = useState<FormActivity>({
    categorySelected: "",
    startDate: null,
    isDone: false,
  });

  const categoryOptions =
    data?.data?.map((item) => ({
      value: item.id || "",
      label: item.name || "",
    })) || [];

  const handleSelectCategory = (option: Option) => {
    setForm((prev) => ({
      ...prev,
      categorySelected: option.value,
    }));
  };

  const handleCheckIsDone = () => {
    setForm((prev) => ({ ...prev, isDone: !prev.isDone }));
  };

  const handleSubmit = () => {
    if (!form.startDate) return;

    const hoursToSeconds = hours * 60 * 60;
    const minutesToSeconds = minutes * 60;

    const dateInSeconds = new Date(
      form.startDate.getTime() +
        (hoursToSeconds + minutesToSeconds + seconds) * 1000
    );

    if (isEdit) {
      mutate({
        id: logActivity?.id || "",
        ...(!!form.categorySelected && {
          category_id: form.categorySelected,
        }),
        is_done: form.isDone,
        start_date: form.startDate,
        end_date: dateInSeconds,
        seconds: hoursToSeconds + minutesToSeconds + seconds,
      });
      return;
    }

    if (form.categorySelected) {
      addActivity({
        activities: [
          {
            category_id: form.categorySelected,
            is_done: form.isDone,
            start_date: form.startDate,
            end_date: dateInSeconds,
            description: "",
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (logActivity?.seconds) {
      const hours = Math.floor(logActivity?.seconds / 3600);
      const remainingSeconds = logActivity?.seconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }

    if (logActivity?.start_date) {
      const date = logActivity?.start_date
        ? new Date(logActivity?.start_date)
        : new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      date.setHours(hour, minute, 0);

      setForm({
        categorySelected: logActivity?.category_id || "",
        startDate: date,
        isDone: logActivity?.is_done || false,
      });
    }
  }, [logActivity]);

  return (
    <Drawer
      isVisible={isVisible}
      height="max-content"
      padding="1.25rem"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxWidth="55%"
          flex={1}
        >
          <Text weight="semi-bold">{isEdit ? "Edit" : "Add"}</Text>
          <Icon name="Close-solid" onClick={onClose} />
        </Flex>
      </Flex>
      <Flex padding="1.25rem 0 2rem" flexDirection="column" gap="1.25rem">
        {(!!form.categorySelected || !isEdit) && (
          <Select
            label="Category"
            value={form.categorySelected}
            options={categoryOptions}
            size="small"
            onSelect={handleSelectCategory}
          />
        )}
        <DatePicker
          selected={form.startDate}
          timeInputLabel="Time:"
          dateFormat="dd/MM/yyyy HH:mm"
          timeFormat="HH:mm"
          placeholderText="Start Time"
          showTimeInput
          onChange={(date) => {
            setForm((prev) => ({ ...prev, startDate: date }));
          }}
        />

        <Flex flexDirection="column" gap=".625rem">
          <Text variant="small" weight="bold" color="black600">
            Time
          </Text>
          <Flex gap="1.25rem">
            <Flex maxWidth="3.75rem" alignItems="center" gap=".5rem">
              <Input
                value={String(hours)}
                size="small"
                style={{ textAlign: "center" }}
                onChange={(e) => setHours(Number(e.currentTarget.value))}
              />
              <Text color="black300">h</Text>
            </Flex>
            <Flex maxWidth="3.75rem" alignItems="center" gap=".5rem">
              <Input
                value={String(minutes)}
                size="small"
                style={{ textAlign: "center" }}
                onChange={(e) => setMinutes(Number(e.currentTarget.value))}
              />
              <Text color="black300">m</Text>
            </Flex>
            <Flex maxWidth="3.75rem" alignItems="center" gap=".5rem">
              <Input
                value={String(seconds)}
                size="small"
                style={{ textAlign: "center" }}
                onChange={(e) => setSeconds(Number(e.currentTarget.value))}
              />
              <Text color="black300">s</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex flexDirection="column" gap=".625rem">
          <Text variant="small" weight="bold" color="black600">
            Is Done?
          </Text>
          <Switch
            size="small"
            active={form.isDone}
            disabled={isEdit}
            onChange={handleCheckIsDone}
          />
        </Flex>
      </Flex>
      <Button
        variant="primary"
        size="medium"
        shape="semi-round"
        isBlock
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Drawer>
  );
};
