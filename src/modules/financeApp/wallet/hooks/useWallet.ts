import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CreateWalletRequest, WalletResponse } from "../models";
import { WalletServices } from "../services";

export const useGetWallet = (options?: UseQueryOptions<WalletResponse>) =>
  useQuery({
    queryKey: ["wallet"],
    queryFn: () => WalletServices.get(),
    ...options,
  });

export const useCreateWallet = (
  options?: UseMutationOptions<void, AxiosError, CreateWalletRequest>
) =>
  useMutation({
    mutationFn: (data) => WalletServices.create(data),
    ...options,
  });
