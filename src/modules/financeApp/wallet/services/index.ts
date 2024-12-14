import { httpService } from "@/utils/httpService";

import {
  BalanceResponse,
  CreateWalletRequest,
  WalletResponse,
} from "../models";

export const WalletServices = {
  get: () =>
    httpService
      .get<WalletResponse>("/finance-app/wallet")
      .then((res) => res.data),

  getBalance: () =>
    httpService
      .get<BalanceResponse>("/finance-app/wallet/balance")
      .then((res) => res.data),

  create: (payload: CreateWalletRequest) =>
    httpService.post("/finance-app/wallet", payload).then((res) => res.data),
};
