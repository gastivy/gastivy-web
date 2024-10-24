import { httpService } from "@/utils/httpService";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/modules/auth/models/Auth";

export const AuthServices = {
  login: (payload: LoginRequest) =>
    httpService
      .post<LoginResponse>("/auth/login", payload)
      .then((res) => res.data),

  register: (payload: RegisterRequest) =>
    httpService
      .post<RegisterResponse>("/auth/register", payload)
      .then((res) => res.data),
};
