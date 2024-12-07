// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Drawer, Flex, Input, Select, Text } from "astarva-ui";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import {
  CategoryTransactionRequest,
  TypesTransactions,
} from "@/modules/financeApp/category/models";
import { schemaCategoryTransaction } from "@/modules/financeApp/category/schema/category";

interface Props {
  isVisible: boolean;
  // refetch: () => void;
  onBack: () => void;
}

export const AddCategoryDrawer: React.FC<Props> = ({
  isVisible,
  // refetch,
  onBack,
}) => {
  const { isPending, mutate } = useCreateCategoryTransaction({
    onSuccess: () => {
      onBack();
      // refetch();
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategoryTransaction),
  });

  const handleSave = (form: CategoryTransactionRequest) => {
    mutate(form);
  };

  const typeTransactionOptions = [
    { label: "Income", value: TypesTransactions.INCOME },
    { label: "Expenses", value: TypesTransactions.EXPENSES },
  ];

  return (
    <Drawer
      padding="1rem"
      gap="1.5rem"
      isVisible={isVisible}
      closeable
      onClose={onBack}
    >
      <Text textAlign="center" weight="medium">
        Add Category Transactions
      </Text>
      <Flex flexDirection="column" gap="1.5rem" width="100%">
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
