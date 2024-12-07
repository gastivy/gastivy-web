import { PageRender } from "@/components/base/PageRender";
import StatisticsFinanceContainer from "@/containers/mobile/financeApp/statistics";
import { PageNotSupport } from "@/containers/web";

const StatisticFinance = () =>
  PageRender({
    mobile: <StatisticsFinanceContainer />,
    web: <PageNotSupport />,
  });

export default StatisticFinance;
