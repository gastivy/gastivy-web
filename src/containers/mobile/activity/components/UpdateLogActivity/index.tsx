import Drawer from "@/components/base/Drawer";
import { useUpdateActivity } from "@/modules/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activity/models";
import { useGetListCategory } from "@/modules/category/hooks/useCategory";
import { Button, Flex, Icon, Input, Text } from "astarva-ui";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select, { SingleValue } from "react-select";

interface UpdateLogActivityProps {
  logActivity?: LogActivity;
  refetch: () => void;
  onClose: () => void;
}

type MyOption = { label: string; value: string };

interface FormActivity {
  categorySelected: MyOption | null;
  startDate: Date | null;
  isDone: boolean;
}

export const UpdateLogActivity: React.FC<UpdateLogActivityProps> = ({
  logActivity,
  onClose,
  refetch,
}) => {
  const { mutate } = useUpdateActivity({
    onSuccess: () => {
      onClose();
      refetch();
    },
  });
  const { data } = useGetListCategory();
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [form, setForm] = useState<FormActivity>({
    categorySelected: null,
    startDate: null,
    isDone: false,
  });

  const categoryOptions = data?.data?.map((item) => ({
    value: item.id || "",
    label: item.name || "",
  }));

  const handleSelectCategory = (newValue: SingleValue<MyOption>) => {
    setForm((prev) => ({
      ...prev,
      categorySelected: newValue,
    }));
  };

  const handleCheckIsDone = (checked: boolean) => {
    setForm((prev) => ({ ...prev, isDone: checked }));
  };

  const handleSubmit = () => {
    if (!form.startDate) return;

    const hoursToSeconds = hours * 60 * 60;
    const minutesToSeconds = minutes * 60;

    const dateInSeconds = new Date(
      form.startDate.getTime() +
        (hoursToSeconds + minutesToSeconds + seconds) * 1000
    );

    mutate({
      id: logActivity?.id || "",
      ...(!!form.categorySelected?.value && {
        category_id: form.categorySelected?.value,
      }),
      is_done: form.isDone,
      start_date: form.startDate,
      end_date: dateInSeconds,
      seconds: hoursToSeconds + minutesToSeconds + seconds,
    });
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
        categorySelected: {
          value: logActivity?.category_id || "",
          label: logActivity?.category_name || "",
        },
        startDate: date,
        isDone: logActivity?.is_done || false,
      });
    }
  }, [logActivity]);

  return (
    <Drawer
      height="max-content"
      borderTopLeftRadius="1.25rem"
      borderTopRightRadius="1.25rem"
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
          <Text weight="semi-bold">Edit</Text>
          <Icon icon="Close-solid" onClick={onClose} />
        </Flex>
      </Flex>
      <Flex padding="1.25rem 0 2rem" flexDirection="column" gap="1rem">
        {!!form.categorySelected && (
          <Select
            defaultValue={form.categorySelected}
            options={categoryOptions}
            onChange={handleSelectCategory}
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

        <Flex gap="8px" alignItems="center">
          <Text variant="small" color="black600">
            Is Done?
          </Text>
          <input
            type="checkbox"
            checked={form.isDone}
            onChange={(e) => handleCheckIsDone(e.currentTarget.checked)}
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
