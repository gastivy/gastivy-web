import { PageRender } from "@/components/base/PageRender";
import LoginContainer from "@/containers/mobile/login";
import { PageNotSupport } from "@/containers/web";

const Login = () =>
  PageRender({
    mobile: <LoginContainer />,
    web: <PageNotSupport />,
  });

export default Login;
