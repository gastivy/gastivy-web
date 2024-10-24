import { httpService } from "@/utils/httpService";
import { LoginRequest, LoginResponse } from "@/modules/auth/models/Auth";

export const AuthServices = {
  login: (payload: LoginRequest) =>
    httpService
      .post<LoginResponse>("/auth/login", payload)
      .then((res) => res.data),

  register: (payload: any) => {
    httpService.post("/auth/register", payload);
  },
};
