import { PageRender } from "@/components/base/PageRender";
import HomeContainer from "@/containers/mobile/activityApp/home";
import { PageNotSupport } from "@/containers/web";

const HomeActivity = () =>
  PageRender({
    mobile: <HomeContainer />,
    web: <PageNotSupport />,
  });

export default HomeActivity;
