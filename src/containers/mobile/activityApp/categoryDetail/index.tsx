import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Input, Skeleton, useDisclosure } from "astarva-ui";
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

import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";

const CategoryDetailContainer: React.FC = () => {
  const { query, push } = useRouter();
  const confirmDeleteModal = useDisclosure({ open: false });
  const { data, isLoading } = useGetCategoryById(query.categoryId as string);
  const { isPending: isPendingUpdate, mutate } = useUpdateCategory({
    onSuccess: () => {
      push(route.activityApp.category.path);
    },
  });
  const { isPending: isPendingDelete, mutate: deleteCategory } =
    useDeleteCategory({
      onSuccess: () => {
        confirmDeleteModal.onClose();
        push(route.activityApp.category.path);
      },
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
      {/* Modal Confirm Delete */}
      <ConfirmDeleteModal
        categoryName={name}
        isVisible={confirmDeleteModal.isOpen}
        onClose={confirmDeleteModal.onClose}
        onDelete={handeDelete}
      />

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
          <Flex gap=".5rem">
            <Button
              isBlock
              variant="secondary"
              size="small"
              shape="semi-round"
              onClick={confirmDeleteModal.onOpen}
            >
              Delete
            </Button>
            <Button
              isBlock
              size="small"
              shape="semi-round"
              onClick={handleSubmit(handleSave)}
            >
              Save
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
