import { PageRender } from "@/components/base/PageRender";
import CategoryDetailTransactionContainer from "@/containers/mobile/financeApp/categoryDetail";
import { PageNotSupport } from "@/containers/web";

const CategoryFinance = () =>
  PageRender({
    mobile: <CategoryDetailTransactionContainer />,
    web: <PageNotSupport />,
  });

export default CategoryFinance;
