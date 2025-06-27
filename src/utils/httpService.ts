import axios from "axios";

import { KEY_ACCESS_TOKEN } from "@/constants/cookies";
import { AuthServices } from "@/modules/auth/services";

export const httpService = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(KEY_ACCESS_TOKEN);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      // eslint-disable-next-line no-console
      console.warn("No token found, Authorization header not set.");
    }

    return config;
  },
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
