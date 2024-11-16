import { httpService } from "@/utils/httpService";
import { CreateActivityRequest } from "../models";

export const ActivityServices = {
  getAll: () => httpService.get("/activity").then((res) => res.data),

  create: (payload: CreateActivityRequest) =>
    httpService.post("/activity/create", payload).then((res) => res.data),
};
