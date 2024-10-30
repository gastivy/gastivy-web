import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateActivityRequest } from "../models";
import { ActivityServices } from "../services";

export const useCreateActivity = (
  options?: UseMutationOptions<void, AxiosError, CreateActivityRequest>
) =>
  useMutation({
    mutationFn: (data) => ActivityServices.create(data),
    ...options,
  });
