import { httpService } from "@/utils/httpService";

import {
  CategoryTransactionRequest,
  CategoryTransactionResponse,
} from "../models";

export const CategoryTransactionServices = {
  get: () =>
    httpService
      .get<CategoryTransactionResponse>("/finance-app/categories")
      .then((res) => res.data),

  create: (payload: CategoryTransactionRequest) =>
    httpService
      .post("/finance-app/categories", payload)
      .then((res) => res.data),
};
