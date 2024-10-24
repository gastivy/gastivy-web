import axios from "axios";

// create axios instance wrapper
export const httpService = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    // Add your token or other credentials to every request here
    const token = localStorage.getItem("authToken"); // Example: Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Make sure to return the modified config
    return config;
  },
  (error) => {
    // Handle any errors that occur before the request is sent
    return Promise.reject(error);
  }
);

// add interceptor to handle errors
httpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const windowObj = typeof window !== "undefined" ? window : undefined;

    if (error?.response?.status === 401) {
      const baseUrl = windowObj?.location.origin;
      const currentUrl = windowObj?.location.href;

      // redirect to login page if not authenticated
      if (windowObj) {
        windowObj.location.href = `${baseUrl}/login?referrer=${currentUrl}`;
      }
    }

    return Promise.reject(error);
  }
);
