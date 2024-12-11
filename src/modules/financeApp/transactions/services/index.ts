import { httpService } from "@/utils/httpService";

import { CreateTransactionRequest } from "../models";

export const TransactionServices = {
  create: (payload: CreateTransactionRequest) =>
    httpService
      .post("/finance-app/transactions", payload)
      .then((res) => res.data),
};
