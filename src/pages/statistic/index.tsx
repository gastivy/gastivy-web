import { PageRender } from "@/components/base/PageRender";
import { PageNotSupport } from "@/containers/web";

const Activity = () =>
  PageRender({
    mobile: <PageNotSupport />,
    web: <PageNotSupport />,
  });

export default Activity;
