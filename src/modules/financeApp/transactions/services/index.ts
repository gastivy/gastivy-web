import { httpService } from "@/utils/httpService";

import { CreateTransactionRequest, TransactionsResponse } from "../models";

export const TransactionServices = {
  get: () =>
    httpService
      .get<TransactionsResponse>("/finance-app/transactions")
      .then((res) => res.data),

  create: (payload: CreateTransactionRequest) =>
    httpService
      .post("/finance-app/transactions", payload)
      .then((res) => res.data),
};
