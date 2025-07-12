import { HttpResponse } from "@/types/HttpResponse";

export type UserResponse = HttpResponse<User>;

export interface User {
  created_at: Date;
  email: string;
  id: string;
  name: string;
  password: string;
  updated_at: Date;
}
