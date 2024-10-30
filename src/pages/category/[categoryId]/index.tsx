import { PageRender } from "@/components/base/PageRender";
import CategoryDetailContainer from "@/containers/mobile/categoryDetail";
import { PageNotSupport } from "@/containers/web";

const CategoryDetail = () =>
  PageRender({
    mobile: <CategoryDetailContainer />,
    web: <PageNotSupport />,
  });

export default CategoryDetail;
