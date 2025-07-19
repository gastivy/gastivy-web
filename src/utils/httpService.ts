import axios from "axios";

import { AuthServices } from "@/modules/auth/services";

export const httpService = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(
  (config) => config,
  (error) => {
    // eslint-disable-next-line no-console
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await AuthServices.refresh();
    } else {
      // eslint-disable-next-line no-console
      console.error("Response Error:", error.response?.data || error);
    }

    return Promise.reject(error);
  }
);
