import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetCategory } from "@/modules/category/hooks/useCategory";
import { Flex, Text, Skeleton, Icon } from "astarva-ui";
import { useRouter } from "next/router";
import { AddCategoryDrawer } from "./components/AddCategoryDrawer";

const CategoryContainer: React.FC = () => {
  const router = useRouter();
  const addCategoryDisclosure = useDisclosure({ open: false });
  const { data, isLoading, isRefetching, refetch } = useGetCategory();

  return (
    <Layout>
      {addCategoryDisclosure.isOpen && (
        <AddCategoryDrawer
          refetch={refetch}
          onBack={addCategoryDisclosure.onClose}
        />
      )}
      <Text>Category</Text>
      <Flex flexDirection="column" gap="1rem">
        {isLoading || isRefetching
          ? Array.from({ length: 3 }).map((_, index: number) => (
              <Skeleton backgroundColor="black50" height="5rem" key={index} />
            ))
          : data?.data.map((item, index) => {
              return (
                <Flex
                  flexDirection="column"
                  backgroundColor="white"
                  padding=".625rem"
                  borderRadius=".625rem"
                  key={index}
                  gap=".625rem"
                  onClick={() =>
                    router.push(`${route.category.path}/${item.id}`)
                  }
                >
                  <Text color="black800" weight="semi-bold">
                    {item.name}
                  </Text>
                  <Text color="black600">{item.target} menit</Text>
                </Flex>
              );
            })}
      </Flex>
      <Flex
        padding=".75rem"
        backgroundColor="blue400"
        maxWidth="max-content"
        borderRadius="3.125rem"
        boxShadow="0rem .25rem .5rem 0rem rgba(50, 132, 255, 0.25)"
        position="absolute"
        bottom="5.625rem"
        right="1.25rem"
        onClick={addCategoryDisclosure.onOpen}
      >
        <Icon icon="Plus-solid" size="1.25rem" color="white" />
      </Flex>
    </Layout>
  );
};

export default CategoryContainer;
