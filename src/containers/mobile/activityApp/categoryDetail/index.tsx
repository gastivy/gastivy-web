import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Input, Skeleton } from "astarva-ui";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import {
  useDeleteCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "@/modules/activityApp/category/hooks/useCategory";
import { CategoryRequest } from "@/modules/activityApp/category/models";
import { schemaCategory } from "@/modules/activityApp/category/schema/category";

const CategoryDetailContainer: React.FC = () => {
  const { query, push } = useRouter();
  const { data, isLoading } = useGetCategoryById(query.categoryId as string);
  const { isPending: isPendingUpdate, mutate } = useUpdateCategory({
    onSuccess: () => {
      push(route.activityApp.category.path);
    },
  });
  const { isPending: isPendingDelete, mutate: deleteCategory } =
    useDeleteCategory({
      onSuccess: () => push(route.activityApp.category.path),
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

  return (
    <Layout isShowBottomBar={false}>
      {(isPendingUpdate || isPendingDelete) && <Loading />}
      <Navbar
        title="Category Detail"
        onBack={() => push(route.activityApp.category.path)}
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
              label="Category Name"
              placeholder="Input Category Name"
              isError={Boolean(errors.name?.message)}
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Target Daily"
              placeholder="Input Target Daily"
              isError={Boolean(errors.target?.message)}
              error={errors.target?.message}
              {...register("target")}
            />
          </Flex>
          <Flex gap="1.5rem">
            <Button
              isBlock
              size="medium"
              shape="rounded"
              onClick={handleSubmit(handleSave)}
            >
              Save
            </Button>
            <Button
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

export default CategoryDetailContainer;
