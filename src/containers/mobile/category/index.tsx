import { Flex, Icon, Skeleton, Text } from "astarva-ui";
import { useRouter } from "next/router";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetCategory } from "@/modules/category/hooks/useCategory";

import { AddCategoryDrawer } from "./components/AddCategoryDrawer";

const CategoryContainer: React.FC = () => {
  const router = useRouter();
  const addCategoryDisclosure = useDisclosure({ open: false });
  const { data, isLoading, isRefetching, refetch } = useGetCategory();

  return (
    <Layout>
      {/* Add Category Drawer */}
      <AddCategoryDrawer
        isVisible={addCategoryDisclosure.isOpen}
        refetch={refetch}
        onBack={addCategoryDisclosure.onClose}
      />

      <Navbar title="Category">
        <Navbar.Suffix>
          <Flex
            justifyContent="center"
            alignItems="center"
            padding=".375rem"
            backgroundColor="blue400"
            maxWidth="max-content"
            borderRadius=".375rem"
            boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
            onClick={addCategoryDisclosure.onOpen}
          >
            <Icon name="Plus-solid" size="1rem" color="white" />
          </Flex>
        </Navbar.Suffix>
      </Navbar>

      <Flex flexDirection="column" gap="1rem" paddingY="72px">
        {isLoading || isRefetching
          ? Array.from({ length: 3 }).map((_, index: number) => (
              <Skeleton backgroundColor="black50" height="5rem" key={index} />
            ))
          : data?.data.map((item, index) => {
              return (
                <Flex
                  flexDirection="column"
                  backgroundColor="blue50"
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
    </Layout>
  );
};

export default CategoryContainer;
