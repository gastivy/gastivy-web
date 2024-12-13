import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Flex, Input, Select } from "astarva-ui";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { Navbar } from "@/components/mobile/Navbar";
import { typeTransactionOptions } from "@/constants/transactions";
import { useCreateCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import { CategoryTransactionRequest } from "@/modules/financeApp/category/models";
import { schemaCategoryTransaction } from "@/modules/financeApp/category/schema/category";

interface Props {
  isVisible: boolean;
  onBack: () => void;
}

export const AddCategoryDrawer: React.FC<Props> = ({ isVisible, onBack }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useCreateCategoryTransaction({
    onSuccess: () => {
      reset();
      onBack();
      queryClient.invalidateQueries({ queryKey: ["category-transaction"] });
    },
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategoryTransaction),
  });

  const handleSave = (form: CategoryTransactionRequest) => {
    mutate(form);
  };

  return (
    <Drawer
      isFullHeight
      padding="0"
      gap="1rem"
      isVisible={isVisible}
      closeable
      onClose={onBack}
    >
      {isPending && <Loading />}

      <Navbar title="Create Category Transactions" onBack={onBack} />
      <Flex
        flex={1}
        flexDirection="column"
        gap="1.5rem"
        width="100%"
        padding="1rem"
        paddingTop="5rem"
      >
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
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is Required" }}
          render={({ field }) => (
            <Select
              label="Type Transactions"
              value={field.value}
              size="small"
              options={typeTransactionOptions}
              onSelect={(option) => field.onChange(option.value)}
            />
          )}
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
