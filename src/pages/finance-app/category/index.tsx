import { PageRender } from "@/components/base/PageRender";
import CategoryFinanceContainer from "@/containers/mobile/financeApp/category";
import { PageNotSupport } from "@/containers/web";

const CategoryFinance = () =>
  PageRender({
    mobile: <CategoryFinanceContainer />,
    web: <PageNotSupport />,
  });

export default CategoryFinance;
