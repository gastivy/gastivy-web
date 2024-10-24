import { HttpResponse } from "@/types/HttpResponse";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenLogin {
  token: string;
}

export type LoginResponse = HttpResponse<TokenLogin>;
