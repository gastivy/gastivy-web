import { PageRender } from "@/components/base/PageRender";
import HomeFinanceContainer from "@/containers/mobile/financeApp/home";
import { PageNotSupport } from "@/containers/web";

const HomeFinance = () =>
  PageRender({
    mobile: <HomeFinanceContainer />,
    web: <PageNotSupport />,
  });

export default HomeFinance;
