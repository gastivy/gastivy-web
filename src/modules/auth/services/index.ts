import { KEY_ACCESS_TOKEN } from "@/constants/cookies";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/modules/auth/models/Auth";
import { httpService } from "@/utils/httpService";

export const AuthServices = {
  login: (payload: LoginRequest) =>
    httpService
      .post<LoginResponse>("/auth/login", payload)
      .then((res) => res.data),

  register: (payload: RegisterRequest) =>
    httpService
      .post<RegisterResponse>("/auth/register", payload)
      .then((res) => res.data),

  refresh: () =>
    httpService
      .post("/auth/refresh", {}, { withCredentials: true })
      .then((res) => {
        localStorage.setItem(KEY_ACCESS_TOKEN, res.data.data.accessToken);
      })
      .catch(() => {
        const windowObj = typeof window !== "undefined" ? window : undefined;

        const baseUrl = windowObj?.location.origin;
        const currentUrl = windowObj?.location.href;

        // Redirect to login page if not authenticated
        localStorage.removeItem(KEY_ACCESS_TOKEN);

        if (windowObj) {
          windowObj.location.href = `${baseUrl}/login?referrer=${currentUrl}`;
        }
      }),

  logout: () =>
    httpService
      .post("/auth/logout")
      .then(() => localStorage.removeItem(KEY_ACCESS_TOKEN)),
};
