import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { UserResponse } from "../models";
import { UserServices } from "../services";

export const useUser = (options?: UseQueryOptions<UserResponse>) =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => UserServices.get(),
    ...options,
  });
