import { Flex, Icon, Skeleton, Text } from "astarva-ui";
import { useRouter } from "next/router";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetCategory } from "@/modules/activityApp/category/hooks/useCategory";

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

      <Flex flexDirection="column" gap="1rem" paddingY="4.5rem">
        {isLoading || isRefetching
          ? Array.from({ length: 3 }).map((_, index: number) => (
              <Skeleton backgroundColor="black50" height="5rem" key={index} />
            ))
          : data?.data.map((item, index) => {
              return (
                <Flex
                  backgroundColor="white"
                  padding=".625rem"
                  borderRadius=".5rem"
                  key={index}
                  gap=".625rem"
                  boxShadow="0 .125rem .375rem 0 rgba(50, 132, 255, 0.15)"
                  onClick={() =>
                    router.push(`${route.activityApp.category.path}/${item.id}`)
                  }
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="blue50"
                    padding=".75rem"
                    borderRadius=".5rem"
                  >
                    <Icon
                      name="Activity-outline"
                      size="1.75rem"
                      color="blue400"
                    />
                  </Flex>
                  <Flex flexDirection="column">
                    <Text color="black800" weight="medium">
                      {item.name}
                    </Text>
                    <Text color="black500" variant="small">
                      {item.target} minutes
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
      </Flex>
    </Layout>
  );
};

export default CategoryContainer;
