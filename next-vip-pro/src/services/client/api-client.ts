import { ApiResult } from './api-result';

type FetchConfig = {
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: { revalidate?: number | false; tags?: string[] };
};

class ApiClient {
  private static getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
  }

  private static getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private static async handleResponse<T>(response: Response): Promise<ApiResult<T>> {
    const result: ApiResult<T> = {
      isSuccess: false,
    };

    try {
      if (response.ok) {
        const data = await response.json();
        result.data = data;
        result.isSuccess = true;
      } else {
        const errorData = await response.json().catch(() => ({}));
        result.error = {
          statusCode: response.status,
          message: errorData.message || response.statusText,
          errorCode: errorData.errorCode,
        };
      }
    } catch (error) {
      result.error = {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }

    return result;
  }

  static async get<T>(endpoint: string, config?: FetchConfig): Promise<ApiResult<T>> {
    try {
      const response = await fetch(`${this.getBaseUrl()}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...config?.headers,
        },
        cache: config?.cache,
        next: config?.next,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  }

  static async post<T>(
    endpoint: string,
    data?: unknown,
    config?: FetchConfig
  ): Promise<ApiResult<T>> {
    try {
      // Check if it's form data (URLSearchParams or FormData)
      const isFormData = data instanceof FormData;
      const isUrlEncoded =
        typeof data === 'string' &&
        config?.headers?.['Content-Type']?.includes('application/x-www-form-urlencoded');

      let body: string | FormData | undefined;
      let contentType = 'application/json';

      if (isFormData) {
        body = data;
        // Don't set Content-Type for FormData, let browser set it with boundary
        contentType = '';
      } else if (isUrlEncoded) {
        body = data as string;
        contentType = 'application/x-www-form-urlencoded';
      } else if (data) {
        body = JSON.stringify(data);
        contentType = 'application/json';
      }

      const headers: Record<string, string> = {
        ...this.getAuthHeaders(),
        ...config?.headers,
      };

      // Only set Content-Type if we have one and it's not already set
      if (contentType && !headers['Content-Type']) {
        headers['Content-Type'] = contentType;
      }

      const response = await fetch(`${this.getBaseUrl()}${endpoint}`, {
        method: 'POST',
        headers,
        body,
        cache: config?.cache,
        next: config?.next,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  }

  static async put<T>(
    endpoint: string,
    data?: unknown,
    config?: FetchConfig
  ): Promise<ApiResult<T>> {
    try {
      // Check if it's form data (URLSearchParams or FormData)
      const isFormData = data instanceof FormData;
      const isUrlEncoded =
        typeof data === 'string' &&
        config?.headers?.['Content-Type']?.includes('application/x-www-form-urlencoded');

      let body: string | FormData | undefined;
      let contentType = 'application/json';

      if (isFormData) {
        body = data;
        // Don't set Content-Type for FormData, let browser set it with boundary
        contentType = '';
      } else if (isUrlEncoded) {
        body = data as string;
        contentType = 'application/x-www-form-urlencoded';
      } else if (data) {
        body = JSON.stringify(data);
        contentType = 'application/json';
      }

      const headers: Record<string, string> = {
        ...this.getAuthHeaders(),
        ...config?.headers,
      };

      // Only set Content-Type if we have one and it's not already set
      if (contentType && !headers['Content-Type']) {
        headers['Content-Type'] = contentType;
      }

      const response = await fetch(`${this.getBaseUrl()}${endpoint}`, {
        method: 'PUT',
        headers,
        body,
        cache: config?.cache,
        next: config?.next,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  }

  static async delete<T>(endpoint: string, config?: FetchConfig): Promise<ApiResult<T>> {
    try {
      const response = await fetch(`${this.getBaseUrl()}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...config?.headers,
        },
        cache: config?.cache,
        next: config?.next,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  }

  // Special method for form data (file uploads)
  static async postFormData<T>(
    endpoint: string,
    formData: FormData,
    config?: Omit<FetchConfig, 'headers'> & {
      headers?: Omit<Record<string, string>, 'Content-Type'>;
    }
  ): Promise<ApiResult<T>> {
    try {
      const response = await fetch(`${this.getBaseUrl()}${endpoint}`, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          ...config?.headers,
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formData,
        cache: config?.cache,
        next: config?.next,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  }
}

export { ApiClient };
export type { FetchConfig };
