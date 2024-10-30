import { HttpResponse } from "@/types/HttpResponse";

export interface CategoryRequest {
  name: string;
  target: number;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
  target: number;
}

export interface DeleteCategoryRequest {
  categoryIds: string[];
}

export interface Category {
  id?: string;
  user_id?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
  target?: number;
  seconds?: number;
  minutes?: number;
}

export type AllCategoryResponse = HttpResponse<Category[]>;
export type CategoryResponse = HttpResponse<Category>;
