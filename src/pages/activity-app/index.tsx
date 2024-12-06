import { PageRender } from "@/components/base/PageRender";
import HomeContainer from "@/containers/mobile/home";
import { PageNotSupport } from "@/containers/web";

const Login = () =>
  PageRender({
    mobile: <HomeContainer />,
    web: <PageNotSupport />,
  });

export default Login;
