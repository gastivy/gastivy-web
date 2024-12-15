import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  CreateTransactionRequest,
  GetTransactionRequest,
  TransactionsResponse,
} from "../models";
import { TransactionServices } from "../services";

export const useCreateTransactions = (
  options?: UseMutationOptions<void, AxiosError, CreateTransactionRequest>
) =>
  useMutation({
    mutationFn: (data) => TransactionServices.create(data),
    ...options,
  });

export const useGetTransactions = (
  params?: GetTransactionRequest,
  options?: UseQueryOptions<TransactionsResponse>
) =>
  useQuery({
    queryKey: ["transactions", params],
    queryFn: () => TransactionServices.get(params),
    ...options,
  });

export const useDeleteTransaction = (
  options?: UseMutationOptions<void, AxiosError, string>
) =>
  useMutation({
    mutationFn: (transactionId) => TransactionServices.delete(transactionId),
    ...options,
  });
