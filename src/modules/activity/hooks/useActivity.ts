import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  CreateActivityRequest,
  LogActivityResponse,
  UpdateActivityRequest,
} from "../models";
import { ActivityServices } from "../services";

export const useCreateActivity = (
  options?: UseMutationOptions<void, AxiosError, CreateActivityRequest>
) =>
  useMutation({
    mutationFn: (data) => ActivityServices.create(data),
    ...options,
  });

export const useGetActivity = (
  options?: UseQueryOptions<LogActivityResponse>
) =>
  useQuery({
    queryKey: ["all-category"],
    queryFn: () => ActivityServices.getAll(),
    ...options,
  });

export const useDeleteActivity = (
  options?: UseMutationOptions<void, AxiosError, string>
) =>
  useMutation({
    mutationFn: (activityId) => ActivityServices.delete(activityId),
    ...options,
  });

export const useUpdateActivity = (
  options?: UseMutationOptions<void, AxiosError, UpdateActivityRequest>
) =>
  useMutation({
    mutationFn: (data) => ActivityServices.update(data),
    ...options,
  });
