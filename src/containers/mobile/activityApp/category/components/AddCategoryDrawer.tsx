import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Flex, Input } from "astarva-ui";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

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
      onBack();
      refetch();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategory),
  });

  const handleSave = (form: CategoryRequest) => {
    mutate(form);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-category"] });
  }, []);

  return (
    <Drawer padding="1rem" isFullHeight gap="1.5rem" isVisible={isVisible}>
      {isPending && <Loading />}
      <Navbar title="Add Category" onBack={onBack} />

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
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          size="small"
          label="Target Daily"
          _label={{ variant: "small" }}
          placeholder="Input Target Daily"
          isError={Boolean(errors.target?.message)}
          error={errors.target?.message}
          {...register("target")}
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
