import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import {
  useDeleteCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "@/modules/category/hooks/useCategory";
import { CategoryRequest } from "@/modules/category/models";
import { schemaCategory } from "@/modules/category/schema/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Icon, Input, Box, Text, Skeleton } from "astarva-ui";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const CategoryDetailContainer: React.FC = () => {
  const { query, push } = useRouter();
  const { data, isLoading } = useGetCategoryById(query.categoryId as string);
  const { isPending, mutate } = useUpdateCategory();
  const { isPending: isPendingDelete, mutate: deleteCategory } =
    useDeleteCategory({
      onSuccess: () => push(route.category.path),
    });
  const { name = "", target = 0 } = data?.data || {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategory),
  });

  const handleSave = (form: CategoryRequest) => {
    mutate({ ...form, id: String(query.categoryId) });
  };

  const handeDelete = () => {
    deleteCategory({ categoryIds: [String(query.categoryId)] });
  };

  useEffect(() => {
    if (data?.data) {
      setValue("name", name);
      setValue("target", target);
    }
  }, [data?.data]);

  if (isLoading) return <Skeleton />;

  return (
    <Layout>
      <Flex gap="1rem">
        <Box onClick={() => push(route.category.path)}>
          <Icon icon="Left-outline" />
        </Box>
        <Text>Category Detail</Text>
      </Flex>

      <Flex flexDirection="column" gap=".75rem">
        <Input
          label="Category Name"
          disabled={isPending || isPendingDelete}
          noBorder
          placeholder="Input Category Name"
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Target Weekly"
          disabled={isPending || isPendingDelete}
          noBorder
          placeholder="Input Target Weekly"
          isError={Boolean(errors.target?.message)}
          error={errors.target?.message}
          {...register("target")}
        />
      </Flex>
      <Button
        disabled={isPending || isPendingDelete}
        isBlock
        shape="rounded"
        onClick={handleSubmit(handleSave)}
      >
        Save
      </Button>
      <Button
        disabled={isPending || isPendingDelete}
        isBlock
        backgroundColor="red400"
        shape="rounded"
        onClick={handeDelete}
      >
        Delete
      </Button>
    </Layout>
  );
};

export default CategoryDetailContainer;
