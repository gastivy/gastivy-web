import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  CategoryTransactionRequest,
  CategoryTransactionResponse,
} from "../models";
import { CategoryTransactionServices } from "../services";

export const useGetCategoryTransaction = (
  options?: UseQueryOptions<CategoryTransactionResponse>
) =>
  useQuery({
    queryKey: ["category-transaction"],
    queryFn: () => CategoryTransactionServices.get(),
    ...options,
  });

export const useCreateCategoryTransaction = (
  options?: UseMutationOptions<void, AxiosError, CategoryTransactionRequest>
) =>
  useMutation({
    mutationFn: (data) => CategoryTransactionServices.create(data),
    ...options,
  });
