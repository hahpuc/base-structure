import axios, { AxiosStatic } from "axios";
import { env } from "../env.service";

const setUpAxios = (axiosInstance: AxiosStatic) => {
  axiosInstance.defaults.baseURL = env.api.fullUrl;
  axiosInstance.defaults.timeout = 10000;
  axiosInstance.defaults.headers["Content-Type"] = "application/json";

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add locale header for internationalization
      if (typeof window !== "undefined") {
        const currentLanguage =
          localStorage.getItem("selected_language") || "en";
        config.headers["Accept-Language"] = currentLanguage;
      }

      // Add other headers as needed
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle global error responses
      if (error.response?.status >= 500) {
        console.error(
          "Server error:",
          error.response?.data?.message || "Internal server error"
        );
      }

      return Promise.reject(error);
    }
  );
};

// Initialize axios
setUpAxios(axios);

export { setUpAxios };
