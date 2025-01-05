import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Drawer, Flex, Input } from "astarva-ui";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { Navbar } from "@/components/mobile/Navbar";
import { useCreateCategory } from "@/modules/activityApp/category/hooks/useCategory";
import { CategoryRequest } from "@/modules/activityApp/category/models";
import { schemaCategory } from "@/modules/activityApp/category/schema/category";

interface Props {
  isVisible: boolean;
  refetch: () => void;
  onBack: () => void;
}

export const AddCategoryDrawer: React.FC<Props> = ({
  isVisible,
  refetch,
  onBack,
}) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useCreateCategory({
    onSuccess: () => {
      refetch();
      handleBack();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schemaCategory),
    defaultValues: {
      name: "",
      target: 0,
      startDate: new Date(),
    },
  });

  const handleSave = (form: CategoryRequest) => {
    mutate(form);
  };

  const handleBack = () => {
    reset();
    onBack();
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-category"] });
  }, []);

  return (
    <Drawer padding="1rem" isFullHeight gap="1.5rem" isVisible={isVisible}>
      {isPending && <Loading />}
      <Navbar title="Add Category" onBack={handleBack} />

      <Flex
        flex={1}
        flexDirection="column"
        gap="1.5rem"
        width="100%"
        paddingTop="5rem"
      >
        <Input
          size="small"
          label="Category Name"
          placeholder="Input Category Name"
          _label={{ variant: "small" }}
          maxLength={30}
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
          {...register("name")}
        />
        <Controller
          name="target"
          control={control}
          rules={{ required: "Target Daily is Required" }}
          render={({ field }) => (
            <Input.Number
              label="Target Daily"
              value={String(field.value || "")}
              size="small"
              isError={Boolean(errors.target?.message)}
              error={errors.target?.message}
              placeholder="Input Target Daily"
              onChange={(value) => field.onChange(value)}
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
      </Flex>
      <Flex padding="1rem">
        <Button
          disabled={isPending}
          isBlock
          shape="semi-round"
          size="medium"
          onClick={handleSubmit(handleSave)}
        >
          Save
        </Button>
      </Flex>
    </Drawer>
  );
};
