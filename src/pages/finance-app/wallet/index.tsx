import { PageRender } from "@/components/base/PageRender";
import WalletContainer from "@/containers/mobile/financeApp/wallet";
import { PageNotSupport } from "@/containers/web";

const Wallet = () =>
  PageRender({
    mobile: <WalletContainer />,
    web: <PageNotSupport />,
  });

export default Wallet;
