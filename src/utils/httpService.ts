import axios from "axios";

import { KEY_ACCESS_TOKEN } from "@/constants/cookies";

import { cookies } from "./cookies";

export const httpService = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(
  (config) => {
    const token = cookies.getCookie(KEY_ACCESS_TOKEN);

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
    const windowObj = typeof window !== "undefined" ? window : undefined;

    if (error?.response?.status === 401) {
      const baseUrl = windowObj?.location.origin;
      const currentUrl = windowObj?.location.href;

      // Redirect to login page if not authenticated
      if (windowObj) {
        cookies.deleteCookie(KEY_ACCESS_TOKEN);
        windowObj.location.href = `${baseUrl}/login?referrer=${currentUrl}`;
      }
    } else {
      // eslint-disable-next-line no-console
      console.error("Response Error:", error.response?.data || error);
    }

    return Promise.reject(error);
  }
);
