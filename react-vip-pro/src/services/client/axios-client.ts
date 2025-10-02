import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiResult } from "./api-result";

class ApiClient {
  static async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const result: ApiResult<T> = {
      isSuccess: false,
    };

    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, config);
      result.data = response.data;
      result.isSuccess = true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        result.error = error.response?.data ?? { message: error.message };
      } else {
        result.error = { message: "An unexpected error occurred" };
      }
    }

    return result;
  }

  static async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const result: ApiResult<T> = {
      isSuccess: false,
    };

    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data, config);
      result.data = response.data;
      result.isSuccess = true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        result.error = error.response?.data ?? { message: error.message };
      } else {
        result.error = { message: "An unexpected error occurred" };
      }
    }

    return result;
  }

  static async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const result: ApiResult<T> = {
      isSuccess: false,
    };

    try {
      const response: AxiosResponse<T> = await axios.put<T>(url, data, config);
      result.data = response.data;
      result.isSuccess = true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        result.error = error.response?.data ?? { message: error.message };
      } else {
        result.error = { message: "An unexpected error occurred" };
      }
    }

    return result;
  }

  static async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const result: ApiResult<T> = {
      isSuccess: false,
    };

    try {
      const response: AxiosResponse<T> = await axios.delete<T>(url, config);
      result.data = response.data;
      result.isSuccess = true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        result.error = error.response?.data ?? { message: error.message };
      } else {
        result.error = { message: "An unexpected error occurred" };
      }
    }

    return result;
  }
}

export { ApiClient };
