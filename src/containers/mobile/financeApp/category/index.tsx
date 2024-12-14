import { Colors, Flex, Icon, Skeleton, Text, useDisclosure } from "astarva-ui";
import { useRouter } from "next/router";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { route } from "@/constants/route";
import { typeTransactionOptions } from "@/constants/transactions";
import { useGetCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import { TypesTransactions } from "@/modules/financeApp/category/models";

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

      <Flex flexDirection="column" gap="1rem" paddingTop="4rem">
        {isLoading || isRefetching
          ? Array.from({ length: 5 }).map((_, index: number) => (
              <Skeleton backgroundColor="black50" height="5rem" key={index} />
            ))
          : data?.data?.map((item) => {
              return (
                <Flex
                  key={item.id}
                  backgroundColor="white"
                  boxShadow="0 .125rem .75rem 0 rgba(50, 132, 255, 0.1)"
                  padding=".625rem"
                  borderRadius=".625rem"
                  alignItems="center"
                  gap="1rem"
                  border={`.0625rem solid ${Colors.black50}`}
                  onClick={() =>
                    router.push(`${route.financeApp.category.path}/${item.id}`)
                  }
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={
                      item.type === TypesTransactions.EXPENSES
                        ? "red50"
                        : "blue50"
                    }
                    padding=".75rem"
                    borderRadius=".5rem"
                  >
                    <Icon
                      name={
                        item.type === TypesTransactions.EXPENSES
                          ? "Cart-outline"
                          : "Coins-outline"
                      }
                      size="1.75rem"
                      color={
                        item.type === TypesTransactions.EXPENSES
                          ? "red400"
                          : "blue400"
                      }
                    />
                  </Flex>
                  <Flex flexDirection="column">
                    <Text variant="medium">{item.name}</Text>
                    <Text
                      variant="extra-small"
                      color="black400"
                      marginTop=".125rem"
                    >
                      {
                        typeTransactionOptions.find(
                          (type) => type.value === item.type
                        )?.label
                      }
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
      </Flex>
    </Layout>
  );
};

export default CategoryFinanceContainer;
