import Drawer from "@/components/base/Drawer";
import { useCreateCategory } from "@/modules/category/hooks/useCategory";
import { CategoryRequest } from "@/modules/category/models";
import { schemaCategory } from "@/modules/category/schema/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Icon, Input } from "astarva-ui";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  refetch: () => void;
  onBack: () => void;
}

export const AddCategoryDrawer: React.FC<Props> = ({ refetch, onBack }) => {
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
    <Drawer>
      <Flex flexDirection="column" padding="1.25rem" gap="1.5rem" width="100%">
        <Icon icon="Arrow-Left-solid" onClick={onBack} />
        <Input
          label="Category Name"
          disabled={isPending}
          placeholder="Input Category Name"
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Target Weekly"
          disabled={isPending}
          placeholder="Input Target Weekly"
          isError={Boolean(errors.target?.message)}
          error={errors.target?.message}
          {...register("target")}
        />
        <Button
          disabled={isPending}
          isBlock
          shape="semi-round"
          onClick={handleSubmit(handleSave)}
        >
          Save
        </Button>
      </Flex>
    </Drawer>
  );
};
