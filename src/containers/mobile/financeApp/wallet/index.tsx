import { Colors, Flex, Icon, Skeleton, Text, useDisclosure } from "astarva-ui";
import { useState } from "react";

import { Assets } from "@/assets";
import { EmptyState } from "@/components/base/EmptyState";
import { Loading } from "@/components/base/Loading";
import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";
import { useGetWallet } from "@/modules/financeApp/wallet/hooks/useWallet";
import { formatter } from "@/utils/formatter";

import { CreateWalletDrawer } from "./components/CreateWalletDrawer";
import { UpdateWalletDrawer } from "./components/UpdateWalletDrawer";

const WalletContainer = () => {
  const createWalletDisclosure = useDisclosure({ open: false });
  const updateWalletDisclosure = useDisclosure({ open: false });
  const [walletId, setWalletId] = useState("");
  const { data, isRefetching, isLoading } = useGetWallet();

  const walletData = data?.data || [];

  const handleSelect = (id?: string) => {
    if (id) {
      setWalletId(id);
      updateWalletDisclosure.onOpen();
    }
  };

  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      {isRefetching && <Loading />}

      {/* Add Wallet Drawer */}
      <CreateWalletDrawer
        isVisible={createWalletDisclosure.isOpen}
        onBack={createWalletDisclosure.onClose}
      />

      {/* Update Wallet */}
      <UpdateWalletDrawer
        walletId={walletId}
        isVisible={updateWalletDisclosure.isOpen}
        onBack={updateWalletDisclosure.onClose}
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

      <Flex flexDirection="column" gap=".75rem" padding="5rem 0 0">
        {isLoading && <LoadingSkeleton />}
        {walletData.length === 0 ? (
          <EmptyState
            src={Assets.WalletEmptyState}
            width={220}
            height={220}
            title="You Have No Wallet"
            description="Create your wallet now for manage your financial"
            buttonText="Create Wallet"
            onClick={createWalletDisclosure.onOpen}
          />
        ) : (
          walletData.map((data, index) => (
            <Flex
              key={index}
              backgroundColor="white"
              boxShadow="0 .125rem .375rem 0 rgba(50, 132, 255, 0.1)"
              padding=".625rem"
              borderRadius=".625rem"
              alignItems="center"
              gap="1rem"
              border={`.0625rem solid ${Colors.black50}`}
              onClick={() => handleSelect(data.id)}
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
          ))
        )}
      </Flex>
    </Layout>
  );
};

function LoadingSkeleton() {
  return (
    <Flex flexDirection="column" gap="1rem">
      {Array.from({ length: 8 }).map((_, index: number) => (
        <Skeleton height="5rem" key={index} />
      ))}
    </Flex>
  );
}

export default WalletContainer;
