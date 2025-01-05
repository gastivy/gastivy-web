import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Input, Select, Skeleton } from "astarva-ui";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import { typeTransactionOptions } from "@/constants/transactions";
import {
  useDeleteCategoryTransaction,
  useGetDetailCategoryTransaction,
  useUpdateCategoryTransaction,
} from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import {
  CategoryTransactionRequest,
  TypesTransactions,
} from "@/modules/financeApp/category/models";
import { schemaCategoryTransaction } from "@/modules/financeApp/category/schema/category";

const CategoryDetailTransactionContainer: React.FC = () => {
  const { query, push } = useRouter();
  const { isPending, mutate } = useUpdateCategoryTransaction({
    onSuccess: () => {
      push(route.financeApp.category.path);
    },
  });
  const { isPending: isPendingDelete, mutate: deleteCategory } =
    useDeleteCategoryTransaction({
      onSuccess: () => push(route.financeApp.category.path),
    });

  const { data, isLoading } = useGetDetailCategoryTransaction(
    query.categoryId as string
  );
  const { name = "", type = TypesTransactions.INCOME } = data?.data || {};

  const disabled = [
    TypesTransactions.TRANSFER,
    TypesTransactions.FEE_TRANSFER,
  ].includes(type);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategoryTransaction),
  });

  const handleSave = (form: CategoryTransactionRequest) => {
    mutate({ ...form, id: String(query.categoryId) });
  };

  const handeDelete = () => {
    deleteCategory({ categoryId: String(query.categoryId) });
  };

  useEffect(() => {
    if (data?.data) {
      setValue("name", name);
      setValue("type", type);
    }
  }, [data?.data]);

  return (
    <Layout isShowBottomBar={false}>
      {(isPending || isPendingDelete) && <Loading />}

      <Navbar
        title="Category Transaction Detail"
        onBack={() => push(route.financeApp.category.path)}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          paddingTop="5rem"
          paddingBottom=".5rem"
          flex={1}
        >
          <Flex flexDirection="column" gap=".75rem">
            <Input
              value={name}
              label="Category Name"
              disabled={disabled}
              size="small"
              placeholder="Input Category Name"
              maxLength={30}
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
                  disabled={disabled}
                  size="small"
                  options={typeTransactionOptions}
                  onSelect={(option) => field.onChange(option.value)}
                />
              )}
            />
          </Flex>
          <Flex gap="1.5rem">
            <Button
              isBlock
              size="medium"
              disabled={disabled}
              shape="rounded"
              onClick={handleSubmit(handleSave)}
            >
              Save
            </Button>
            <Button
              isBlock
              size="medium"
              disabled={disabled}
              backgroundColor="red400"
              shape="rounded"
              onClick={handeDelete}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      )}
    </Layout>
  );
};

function LoadingSkeleton() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      paddingTop="5rem"
      paddingBottom=".5rem"
      flex={1}
    >
      <Flex flexDirection="column" gap="1.5rem">
        {Array.from({ length: 2 }).map((_, index: number) => (
          <Flex flexDirection="column" gap=".5rem" key={index}>
            <Skeleton height="1rem" width="7.5rem" />
            <Skeleton height="2.5rem" />
          </Flex>
        ))}
      </Flex>

      <Flex gap="1.5rem">
        {Array.from({ length: 2 }).map((_, index: number) => (
          <Skeleton height="2.5rem" key={index} />
        ))}
      </Flex>
    </Flex>
  );
}

export default CategoryDetailTransactionContainer;
