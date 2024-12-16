import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  CreateTransactionRequest,
  DetailTransactionsResponse,
  GetTransactionRequest,
  TransactionsResponse,
  UpdateTransactionRequest,
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

export const useGetDetailTransactions = (
  transactionId: string,
  options?: UseQueryOptions<DetailTransactionsResponse>
) =>
  useQuery({
    queryKey: ["detail-transaction"],
    queryFn: () => TransactionServices.getDetail(transactionId),
    ...options,
  });

export const useDeleteTransaction = (
  options?: UseMutationOptions<void, AxiosError, string>
) =>
  useMutation({
    mutationFn: (transactionId) => TransactionServices.delete(transactionId),
    ...options,
  });

export const useUpdateTransactions = (
  options?: UseMutationOptions<void, AxiosError, UpdateTransactionRequest>
) =>
  useMutation({
    mutationFn: (data) => TransactionServices.update(data),
    ...options,
  });
