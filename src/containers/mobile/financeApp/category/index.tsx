import { Flex, Icon, useDisclosure } from "astarva-ui";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";

import { AddCategoryDrawer } from "./components/AddCategoryDrawer";

const CategoryFinanceContainer = () => {
  const addCategoryDisclosure = useDisclosure({ open: false });
  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      {/* Add Category Drawer */}
      <AddCategoryDrawer
        isVisible={addCategoryDisclosure.isOpen}
        // refetch={refetch}
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
    </Layout>
  );
};

export default CategoryFinanceContainer;
