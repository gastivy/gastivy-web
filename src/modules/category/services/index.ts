import { httpService } from "@/utils/httpService";
import {
  AllCategoryResponse,
  CategoryRequest,
  CategoryResponse,
  DeleteCategoryRequest,
  UpdateCategoryRequest,
} from "../models";

export const CategoryServices = {
  getAll: () =>
    httpService.get<AllCategoryResponse>("/categories").then((res) => res.data),

  getById: (categoryId: string) =>
    httpService
      .get<CategoryResponse>(`/categories/${categoryId}`)
      .then((res) => res.data),

  create: (payload: CategoryRequest) =>
    httpService.post("/categories/create", payload).then((res) => res.data),

  update: (payload: UpdateCategoryRequest) =>
    httpService.patch("/categories/save", payload).then((res) => res.data),

  delete: (payload: DeleteCategoryRequest) =>
    httpService
      .delete("/categories/delete", { data: payload })
      .then((res) => res.data),
};
