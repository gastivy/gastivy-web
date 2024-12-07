import { PageRender } from "@/components/base/PageRender";
import CategoryDetailContainer from "@/containers/mobile/activityApp/categoryDetail";
import { PageNotSupport } from "@/containers/web";

const ActivityCategoryDetail = () =>
  PageRender({
    mobile: <CategoryDetailContainer />,
    web: <PageNotSupport />,
  });

export default ActivityCategoryDetail;
