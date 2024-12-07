import { PageRender } from "@/components/base/PageRender";
import TransactionsFinanceContainer from "@/containers/mobile/financeApp/transactions";
import { PageNotSupport } from "@/containers/web";

const TransactionsFinance = () =>
  PageRender({
    mobile: <TransactionsFinanceContainer />,
    web: <PageNotSupport />,
  });

export default TransactionsFinance;
