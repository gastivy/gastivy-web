import { httpService } from "@/utils/httpService";
import { CreateActivityRequest } from "../models";

export const ActivityServices = {
  create: (payload: CreateActivityRequest) =>
    httpService.post("/activity/create", payload).then((res) => res.data),
};
