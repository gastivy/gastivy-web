import { PageRender } from "@/components/base/PageRender";
import RegisterContainer from "@/containers/mobile/register";
import { PageNotSupport } from "@/containers/web";

const Register = () =>
  PageRender({
    mobile: <RegisterContainer />,
    web: <PageNotSupport />,
  });

export default Register;
