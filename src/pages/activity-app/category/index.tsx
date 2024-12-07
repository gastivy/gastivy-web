import { PageRender } from "@/components/base/PageRender";
import CategoryContainer from "@/containers/mobile/activityApp/category";
import { PageNotSupport } from "@/containers/web";

const ActivityCategory = () =>
  PageRender({
    mobile: <CategoryContainer />,
    web: <PageNotSupport />,
  });

export default ActivityCategory;
