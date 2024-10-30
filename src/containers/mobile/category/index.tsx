import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetCategory } from "@/modules/category/hooks/useCategory";
import { Button, Flex, Text, Skeleton } from "astarva-ui";
import { useRouter } from "next/router";
import { AddCategoryDrawer } from "./components/AddCategoryDrawer";

const CategoryContainer: React.FC = () => {
  const router = useRouter();
  const addCategoryDisclosure = useDisclosure({ open: false });
  const { data, isLoading, refetch } = useGetCategory();

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
        {isLoading
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
      <Button isBlock shape="rounded" onClick={addCategoryDisclosure.onOpen}>
        Add Category
      </Button>
    </Layout>
  );
};

export default CategoryContainer;
