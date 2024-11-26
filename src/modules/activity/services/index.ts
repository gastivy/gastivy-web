import { httpService } from "@/utils/httpService";

import { CreateActivityRequest, UpdateActivityRequest } from "../models";

export const ActivityServices = {
  getAll: () => httpService.get("/activity").then((res) => res.data),

  create: (payload: CreateActivityRequest) =>
    httpService.post("/activity", payload).then((res) => res.data),

  delete: (activityId: string) =>
    httpService.delete(`/activity/${activityId}`).then((res) => res.data),

  update: ({ id, ...payload }: UpdateActivityRequest) =>
    httpService.patch(`/activity/${id}`, payload).then((res) => res.data),
};
