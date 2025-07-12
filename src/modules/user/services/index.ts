import { httpService } from "@/utils/httpService";

import { UserResponse } from "../models";

export const UserServices = {
  get: () => httpService.get<UserResponse>("/user").then((res) => res.data),
};
