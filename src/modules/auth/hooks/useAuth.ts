import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/Auth";
import { AuthServices } from "../services";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>
) =>
  useMutation({
    mutationFn: (data) => AuthServices.login(data),
    ...options,
  });

export const useRegister = (
  options?: UseMutationOptions<RegisterResponse, AxiosError, RegisterRequest>
) =>
  useMutation({
    mutationFn: (data) => AuthServices.register(data),
    ...options,
  });
