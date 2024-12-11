import { httpService } from "@/utils/httpService";

import { WalletResponse } from "../models";

export const WalletServices = {
  get: () =>
    httpService
      .get<WalletResponse>("/finance-app/wallet")
      .then((res) => res.data),
};
