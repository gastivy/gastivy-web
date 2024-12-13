import { Flex, Icon, Skeleton, Text, useDisclosure } from "astarva-ui";
import { useRouter } from "next/router";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import { useGetCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";

import { AddCategoryDrawer } from "./components/AddCategoryDrawer";

const CategoryFinanceContainer = () => {
  const router = useRouter();
  const addCategoryDisclosure = useDisclosure({ open: false });
  const { data, isLoading, isRefetching } = useGetCategoryTransaction();
  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      {/* Add Category Drawer */}
      <AddCategoryDrawer
        isVisible={addCategoryDisclosure.isOpen}
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

      <Flex flexDirection="column" gap="1rem" paddingTop="64px">
        {isLoading || isRefetching
          ? Array.from({ length: 5 }).map((_, index: number) => (
              <Skeleton backgroundColor="black50" height="5rem" key={index} />
            ))
          : data?.data?.map((item) => {
              return (
                <Flex
                  key={item.id}
                  backgroundColor="blue50"
                  padding=".5rem .75rem"
                  borderRadius=".375rem"
                  onClick={() =>
                    router.push(`${route.financeApp.category.path}/${item.id}`)
                  }
                >
                  <Text variant="medium">{item.name}</Text>
                </Flex>
              );
            })}
      </Flex>
    </Layout>
  );
};

export default CategoryFinanceContainer;
