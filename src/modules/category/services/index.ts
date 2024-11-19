import { httpService } from "@/utils/httpService";
import {
  AllCategoryResponse,
  CategoryRequest,
  CategoryResponse,
  DeleteCategoryRequest,
  GetCategoryRequest,
  UpdateCategoryRequest,
} from "../models";

export const CategoryServices = {
  getAll: (params?: GetCategoryRequest) =>
    httpService
      .get<AllCategoryResponse>("/categories", { params })
      .then((res) => res.data),

  getList: () =>
    httpService
      .get<AllCategoryResponse>("/categories/list")
      .then((res) => res.data),

  getById: (categoryId: string) =>
    httpService
      .get<CategoryResponse>(`/categories/${categoryId}`)
      .then((res) => res.data),

  create: (payload: CategoryRequest) =>
    httpService.post("/categories", payload).then((res) => res.data),

  update: (payload: UpdateCategoryRequest) =>
    httpService.patch("/categories", payload).then((res) => res.data),

  delete: (payload: DeleteCategoryRequest) =>
    httpService
      .delete("/categories", { data: payload })
      .then((res) => res.data),
};
