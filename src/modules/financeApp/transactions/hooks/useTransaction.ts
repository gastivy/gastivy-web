import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CreateTransactionRequest, TransactionsResponse } from "../models";
import { TransactionServices } from "../services";

export const useCreateTransactions = (
  options?: UseMutationOptions<void, AxiosError, CreateTransactionRequest>
) =>
  useMutation({
    mutationFn: (data) => TransactionServices.create(data),
    ...options,
  });

export const useGetTransactions = (
  options?: UseQueryOptions<TransactionsResponse>
) =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: () => TransactionServices.get(),
    ...options,
  });
