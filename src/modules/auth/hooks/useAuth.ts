import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../models/Auth";
import { AuthServices } from "../services";
import { AxiosError } from "axios";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>
) =>
  useMutation({
    mutationFn: (data) => AuthServices.login(data),
    ...options,
  });
