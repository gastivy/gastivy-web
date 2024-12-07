import { PageRender } from "@/components/base/PageRender";
import ActivityContainer from "@/containers/mobile/activityApp/activity";
import { PageNotSupport } from "@/containers/web";

const Activity = () =>
  PageRender({
    mobile: <ActivityContainer />,
    web: <PageNotSupport />,
  });

export default Activity;
