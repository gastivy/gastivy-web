import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  AllCategoryResponse,
  CategoryRequest,
  CategoryResponse,
  DeleteCategoryRequest,
  UpdateCategoryRequest,
} from "../models";
import { CategoryServices } from "../services";
import { AxiosError } from "axios";

export const useGetCategory = (
  options?: UseQueryOptions<AllCategoryResponse>
) =>
  useQuery({
    queryKey: ["all-category"],
    queryFn: () => CategoryServices.getAll(),
    ...options,
  });

export const useGetCategoryById = (
  categoryId: string,
  options?: UseQueryOptions<CategoryResponse>
) =>
  useQuery({
    queryKey: ["category-by-id", categoryId],
    queryFn: () => CategoryServices.getById(categoryId),
    ...options,
  });

export const useUpdateCategory = (
  options?: UseMutationOptions<void, AxiosError, UpdateCategoryRequest>
) =>
  useMutation({
    mutationFn: (data) => CategoryServices.update(data),
    ...options,
  });

export const useCreateCategory = (
  options?: UseMutationOptions<void, AxiosError, CategoryRequest>
) =>
  useMutation({
    mutationFn: (data) => CategoryServices.create(data),
    ...options,
  });

export const useDeleteCategory = (
  options?: UseMutationOptions<void, AxiosError, DeleteCategoryRequest>
) =>
  useMutation({
    mutationFn: (data) => CategoryServices.delete(data),
    ...options,
  });
