import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateActivityRequest, LogActivityResponse } from "../models";
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
