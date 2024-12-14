import { Colors, Flex, Icon, Text, useDisclosure } from "astarva-ui";

import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { useGetWallet } from "@/modules/financeApp/wallet/hooks/useWallet";
import { formatter } from "@/utils/formatter";

import { CreateWalletDrawer } from "./components/CreateWalletDrawer";

const WalletContainer = () => {
  const createWalletDisclosure = useDisclosure({ open: false });
  const { data } = useGetWallet();

  const walletData = data?.data || [];
  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      {/* Add Transactions Drawer */}
      <CreateWalletDrawer
        isVisible={createWalletDisclosure.isOpen}
        onBack={createWalletDisclosure.onClose}
      />

      <Navbar title="Wallet">
        <Navbar.Suffix>
          <Flex
            justifyContent="center"
            alignItems="center"
            padding=".375rem"
            backgroundColor="blue400"
            maxWidth="max-content"
            borderRadius=".375rem"
            boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
            onClick={createWalletDisclosure.onOpen}
          >
            <Icon name="Plus-solid" size="1rem" color="white" />
          </Flex>
        </Navbar.Suffix>
      </Navbar>

      <Flex flexDirection="column" gap=".75rem" padding="5rem 0">
        {walletData.map((data, index) => {
          return (
            <Flex
              key={index}
              backgroundColor="white"
              boxShadow="0 .125rem .75rem 0 rgba(50, 132, 255, 0.1)"
              padding=".625rem"
              borderRadius=".625rem"
              alignItems="center"
              gap="1rem"
              border={`.0625rem solid ${Colors.black50}`}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                backgroundColor="blue50"
                padding=".75rem"
                borderRadius=".5rem"
              >
                <Icon name="Wallet-outline" size="1.75rem" color="blue400" />
              </Flex>
              <Flex flexDirection="column">
                <Text variant="medium">{data.name}</Text>
                <Text variant="small" color="black400">
                  {formatter.currency(data.balance)}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Layout>
  );
};

export default WalletContainer;
