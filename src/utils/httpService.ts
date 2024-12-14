import axios from "axios";

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
    const token = cookies.getCookie("GSTID");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found, Authorization header not set.");
    }

    return config;
  },
  (error) => {
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
        cookies.deleteCookie("GSTID");
        windowObj.location.href = `${baseUrl}/login?referrer=${currentUrl}`;
      }
    } else {
      console.error("Response Error:", error.response?.data || error);
    }

    return Promise.reject(error);
  }
);
