import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { WalletResponse } from "../models";
import { WalletServices } from "../services";

export const useGetWallet = (options?: UseQueryOptions<WalletResponse>) =>
  useQuery({
    queryKey: ["wallet"],
    queryFn: () => WalletServices.get(),
    ...options,
  });
