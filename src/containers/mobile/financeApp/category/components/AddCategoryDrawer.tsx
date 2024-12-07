// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Drawer, Flex, Input, Select, Text } from "astarva-ui";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { CategoryTransactionRequest } from "@/modules/financeApp/category/models";
// import { useForm } from "react-hook-form";
// import { useCreateCategory } from "@/modules/activityApp/category/hooks/useCategory";
// import { CategoryRequest } from "@/modules/activityApp/category/models";
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
  // const { isPending, mutate } = useCreateCategory({
  //   onSuccess: () => {
  //     onBack();
  //     // refetch();
  //   },
  // });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategoryTransaction),
  });

  const handleSave = (form: CategoryTransactionRequest) => {
    console.log(form);
    // mutate(form);
  };

  const typeTransactionOptions = [
    { label: "Income", value: "1" },
    { label: "Expenses", value: "2" },
  ];

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ["all-category"] });
  // }, []);

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
          // disabled={isPending}
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
          // disabled={isPending}
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
