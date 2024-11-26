import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Flex, Icon, Input, Skeleton, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import {
  useDeleteCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "@/modules/category/hooks/useCategory";
import { CategoryRequest } from "@/modules/category/models";
import { schemaCategory } from "@/modules/category/schema/category";

const CategoryDetailContainer: React.FC = () => {
  const { query, push } = useRouter();
  const { data, isLoading } = useGetCategoryById(query.categoryId as string);
  const { isPending, mutate } = useUpdateCategory({
    onSuccess: () => {
      push(route.category.path);
    },
  });
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
    <Layout isShowBottomBar={false}>
      <Flex
        gap="1rem"
        position="fixed"
        backgroundColor="white"
        top="0"
        left="0"
        width="100%"
        padding=".75rem"
        alignItems="center"
        boxShadow="0px .125rem .5rem 0px rgba(50, 132, 255, 0.25)"
      >
        <Box onClick={() => push(route.category.path)}>
          <Icon name="Arrow-Left-solid" />
        </Box>
        <Text>Category Detail</Text>
      </Flex>

      <Flex
        flexDirection="column"
        justifyContent="space-between"
        paddingTop="3.75rem"
        paddingBottom=".5rem"
        flex={1}
      >
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
        <Flex gap="1.5rem">
          <Button
            disabled={isPending || isPendingDelete}
            isBlock
            size="medium"
            shape="rounded"
            onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>
          <Button
            disabled={isPending || isPendingDelete}
            isBlock
            size="medium"
            backgroundColor="red400"
            shape="rounded"
            onClick={handeDelete}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default CategoryDetailContainer;
