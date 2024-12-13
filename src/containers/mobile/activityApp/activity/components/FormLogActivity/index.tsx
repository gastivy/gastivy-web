import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Drawer,
  Flex,
  Input,
  Option,
  Select,
  Switch,
  Text,
  TimePicker,
} from "astarva-ui";
import React, { useEffect, useState } from "react";

import { Loading } from "@/components/base/Loading";
import { Navbar } from "@/components/mobile/Navbar";
import {
  useCreateActivity,
  useUpdateActivity,
} from "@/modules/activityApp/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activityApp/activity/models";
import { useGetListCategory } from "@/modules/activityApp/category/hooks/useCategory";
import { dateTime } from "@/utils/dateTime";

interface UpdateLogActivityProps {
  logActivity?: LogActivity;
  isEdit?: boolean;
  isVisible: boolean;
  onClose: () => void;
}

interface FormActivity {
  categorySelected: string;
  startDate: Date | null;
  startTime: string | undefined;
  isDone: boolean;
}

export const FormLogActivity: React.FC<UpdateLogActivityProps> = ({
  logActivity,
  isEdit = false,
  isVisible,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isPendingUpdate } = useUpdateActivity({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["all-category"] });
      setForm({
        categorySelected: "",
        startDate: null,
        startTime: undefined,
        isDone: false,
      });
    },
  });

  const { mutate: addActivity, isPending: isPendingCreate } = useCreateActivity(
    {
      onSuccess: async () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["all-category"] });
        setForm({
          categorySelected: "",
          startDate: null,
          startTime: undefined,
          isDone: false,
        });
      },
    }
  );
  const { data } = useGetListCategory();
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [form, setForm] = useState<FormActivity>({
    categorySelected: "",
    startDate: null,
    startTime: undefined,
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
      categorySelected: String(option.value),
    }));
  };

  const handleCheckIsDone = () => {
    setForm((prev) => ({ ...prev, isDone: !prev.isDone }));
  };

  const handleSubmit = () => {
    if (!form.startDate) return;

    const hoursToSeconds = hours * 60 * 60;
    const minutesToSeconds = minutes * 60;

    const time = form.startTime?.split(":") || [];
    if ((time?.length || 0) === 2)
      form.startDate.setHours(Number(time[0]), Number(time[1]), 0, 0);

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
        startTime: dateTime.formatTimeFromUTC(String(date)),
      });
    }
  }, [logActivity]);

  return (
    <Drawer
      isFullHeight
      gap="1rem"
      isVisible={isVisible}
      padding="1.25rem"
      flexDirection="column"
    >
      {/* Loading */}
      {(isPendingUpdate || isPendingCreate) && <Loading />}

      <Navbar
        title={isEdit ? "Edit Activity" : "Create Activity"}
        onBack={onClose}
      />

      <Flex flex={1} padding="5rem 0 2rem" flexDirection="column" gap="1.25rem">
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
          label="Start Time"
          selected={form.startDate}
          placeholderText="Select Date..."
          onSelect={(date) => {
            setForm((prev) => ({ ...prev, startDate: date }));
          }}
        />

        {(form.startTime || !isEdit) && (
          <TimePicker
            value={form.startTime}
            label="Time Picker"
            onSelect={(val) => {
              setForm((prev) => ({ ...prev, startTime: val }));
            }}
          />
        )}

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
