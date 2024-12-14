import { httpService } from "@/utils/httpService";

import {
  CreateTransactionRequest,
  GetTransactionRequest,
  TransactionsResponse,
} from "../models";

export const TransactionServices = {
  get: (params?: GetTransactionRequest) =>
    httpService
      .get<TransactionsResponse>("/finance-app/transactions", { params })
      .then((res) => res.data),

  create: (payload: CreateTransactionRequest) =>
    httpService
      .post("/finance-app/transactions", payload)
      .then((res) => res.data),
};
