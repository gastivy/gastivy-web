import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CreateTransactionRequest } from "../models";
import { TransactionServices } from "../services";

export const useCreateTransactions = (
  options?: UseMutationOptions<void, AxiosError, CreateTransactionRequest>
) =>
  useMutation({
    mutationFn: (data) => TransactionServices.create(data),
    ...options,
  });
