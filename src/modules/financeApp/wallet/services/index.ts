import { httpService } from "@/utils/httpService";

import { CreateWalletRequest, WalletResponse } from "../models";

export const WalletServices = {
  get: () =>
    httpService
      .get<WalletResponse>("/finance-app/wallet")
      .then((res) => res.data),

  create: (payload: CreateWalletRequest) =>
    httpService.post("/finance-app/wallet", payload).then((res) => res.data),
};
