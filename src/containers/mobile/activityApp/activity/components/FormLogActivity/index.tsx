import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Drawer,
  Flex,
  Input,
  Select,
  Switch,
  Text,
  TimePicker,
} from "astarva-ui";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { Navbar } from "@/components/mobile/Navbar";
import {
  useCreateActivity,
  useUpdateActivity,
} from "@/modules/activityApp/activity/hooks/useActivity";
import { LogActivity } from "@/modules/activityApp/activity/models";
import { schemaActivity } from "@/modules/activityApp/activity/schemas/activity";
import { useGetListCategory } from "@/modules/activityApp/category/hooks/useCategory";
import { dateTime } from "@/utils/dateTime";

interface UpdateLogActivityProps {
  logActivity?: LogActivity;
  isEdit?: boolean;
  isVisible: boolean;
  onClose: () => void;
}

interface FormActivity {
  categoryActivity: string | undefined;
  startDate: Date | null;
  startTime: string;
  seconds?: number;
  minutes?: number;
  hours?: number;
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
      handleBack();
      queryClient.invalidateQueries({ queryKey: ["all-category"] });
    },
  });

  const { mutate: addActivity, isPending: isPendingCreate } = useCreateActivity(
    {
      onSuccess: async () => {
        handleBack();
        queryClient.invalidateQueries({ queryKey: ["all-category"] });
      },
    }
  );
  const { data } = useGetListCategory();
  const {
    control,
    formState: { errors },
    handleSubmit: onSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaActivity),
    defaultValues: {
      categoryActivity: undefined,
      startDate: new Date(),
      startTime: undefined,
      seconds: 0,
      minutes: 0,
      hours: 0,
      isDone: false,
    },
  });
  const fields = watch();

  const categoryOptions =
    data?.data?.map((item) => ({
      value: item.id || "",
      label: item.name || "",
    })) || [];

  const handleSubmit: SubmitHandler<FormActivity> = (form) => {
    if (!form.startDate) return;

    const hoursToSeconds = (form.hours || 0) * 60 * 60;
    const minutesToSeconds = (form.minutes || 0) * 60;

    const time = form.startTime?.split(":") || [];
    if ((time?.length || 0) === 2)
      form.startDate.setHours(Number(time[0]), Number(time[1]), 0, 0);

    const dateInSeconds = new Date(
      form.startDate.getTime() +
        (hoursToSeconds + minutesToSeconds + (form.seconds || 0)) * 1000
    );

    if (isEdit) {
      mutate({
        id: logActivity?.id || "",
        ...(!!form.categoryActivity && {
          category_id: form.categoryActivity,
        }),
        is_done: form.isDone,
        start_date: form.startDate,
        end_date: dateInSeconds,
        seconds: hoursToSeconds + minutesToSeconds + (form.seconds || 0),
      });
      return;
    }

    if (form.categoryActivity) {
      addActivity({
        activities: [
          {
            category_id: form.categoryActivity,
            is_done: form.isDone,
            start_date: form.startDate,
            end_date: dateInSeconds,
            description: "",
          },
        ],
      });
    }
  };

  const handleBack = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (logActivity?.seconds) {
      const hours = Math.floor(logActivity?.seconds / 3600);
      const remainingSeconds = logActivity?.seconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      setValue("hours", hours);
      setValue("minutes", minutes);
      setValue("seconds", seconds);
    }

    if (logActivity?.start_date) {
      const date = logActivity?.start_date
        ? new Date(logActivity?.start_date)
        : new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      date.setHours(hour, minute, 0);

      setValue("categoryActivity", logActivity?.category_id || "");
      setValue("startDate", date);
      setValue("isDone", logActivity?.is_done || false);
      setValue("startTime", dateTime.formatTimeFromUTC(String(date)));
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
        onBack={handleBack}
      />

      <Flex flex={1} padding="5rem 0 2rem" flexDirection="column" gap="1.25rem">
        <Controller
          name="categoryActivity"
          control={control}
          render={({ field }) => (
            <Select
              label="Category Activity"
              value={field.value}
              isError={Boolean(errors.categoryActivity?.message)}
              error={errors.categoryActivity?.message}
              size="small"
              options={categoryOptions}
              onSelect={(option) => field.onChange(option.value)}
            />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => {
            const currentDate = field.value
              ? new Date(field.value)
              : new Date();

            return (
              <DatePicker
                label="Start Date"
                selected={currentDate}
                onSelect={(val) => field.onChange(val)}
              />
            );
          }}
        />

        {(fields.startTime || !isEdit) && (
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Start Time"
                value={field.value}
                isError={Boolean(errors.startTime?.message)}
                error={errors.startTime?.message}
                onSelect={(value) => field.onChange(value)}
              />
            )}
          />
        )}

        <Flex flexDirection="column" gap=".625rem">
          <Text weight="medium" color="black900">
            Time
          </Text>
          <Flex gap="1.25rem">
            <Flex maxWidth="3.75rem" alignItems="center" gap=".5rem">
              <Input
                size="small"
                style={{ textAlign: "center" }}
                isError={Boolean(errors.seconds?.message)}
                {...register("hours")}
              />
              <Text color="black300">h</Text>
            </Flex>
            <Flex maxWidth="3.75rem" alignItems="center" gap=".5rem">
              <Input
                size="small"
                style={{ textAlign: "center" }}
                isError={Boolean(errors.seconds?.message)}
                {...register("minutes")}
              />
              <Text color="black300">m</Text>
            </Flex>
            <Flex maxWidth="3.75rem" alignItems="center" gap=".5rem">
              <Input
                size="small"
                style={{ textAlign: "center" }}
                isError={Boolean(errors.seconds?.message)}
                {...register("seconds")}
              />
              <Text color="black300">s</Text>
            </Flex>
          </Flex>
          {Boolean(errors.seconds?.message) && (
            <Text color="red400" variant="extra-small">
              Time is required
            </Text>
          )}
        </Flex>

        <Controller
          name="isDone"
          control={control}
          render={({ field }) => (
            <Switch
              label="Is Done?"
              size="small"
              active={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </Flex>
      <Button
        variant="primary"
        size="medium"
        shape="semi-round"
        isBlock
        onClick={onSubmit(handleSubmit)}
      >
        Submit
      </Button>
    </Drawer>
  );
};
