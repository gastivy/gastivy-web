import { PageRender } from "@/components/base/PageRender";
import CategoryContainer from "@/containers/mobile/category";
import { PageNotSupport } from "@/containers/web";

const Category = () =>
  PageRender({
    mobile: <CategoryContainer />,
    web: <PageNotSupport />,
  });

export default Category;
