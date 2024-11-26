import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Flex, Icon, Input } from "astarva-ui";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateCategory } from "@/modules/category/hooks/useCategory";
import { CategoryRequest } from "@/modules/category/models";
import { schemaCategory } from "@/modules/category/schema/category";

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
    <Drawer padding="1rem" isVisible={isVisible}>
      <Flex flexDirection="column" gap="1.5rem" width="100%">
        <Icon name="Arrow-Left-solid" onClick={onBack} />
        <Input
          size="small"
          label="Category Name"
          disabled={isPending}
          placeholder="Input Category Name"
          _label={{ variant: "small" }}
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          size="small"
          label="Target Weekly"
          disabled={isPending}
          _label={{ variant: "small" }}
          placeholder="Input Target Weekly"
          isError={Boolean(errors.target?.message)}
          error={errors.target?.message}
          {...register("target")}
        />
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
