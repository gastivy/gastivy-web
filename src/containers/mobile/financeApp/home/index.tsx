import Layout from "@/components/mobile/Layout";

import { Balance } from "./components/Balance";
import { Profile } from "./components/Profile";

const HomeFinanceContainer = () => {
  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      <Profile />
      <Balance />
    </Layout>
  );
};

export default HomeFinanceContainer;
