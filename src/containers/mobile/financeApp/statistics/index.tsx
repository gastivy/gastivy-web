import Layout from "@/components/mobile/Layout";
import { Navbar } from "@/components/mobile/Navbar";

import { SummaryTransactions } from "./components/SummaryTransactions";

const StatisticsFinanceContainer = () => {
  return (
    <Layout _flex={{ paddingBottom: "5.5rem" }}>
      <Navbar title="Statistics" />

      <SummaryTransactions />
    </Layout>
  );
};

export default StatisticsFinanceContainer;
