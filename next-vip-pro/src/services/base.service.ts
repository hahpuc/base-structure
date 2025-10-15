import { ApiClient } from "./client/axios-client";
import { ApiResult } from "@/types/api-result";
import { BaseQuery, ListPaginate } from "@/types/base";

export abstract class BaseService<T, TCreate, TUpdate> {
  protected abstract baseUrl: string;

  /**
   * Get paginated list of entities
   */
  async getList(query: BaseQuery): Promise<ApiResult<ListPaginate<T>>> {
    const params = new URLSearchParams();

    // Add pagination parameters
    params.append("page", query.page.toString());
    params.append("limit", query.limit.toString());

    // Add optional parameters
    if (query.filter) {
      params.append("filter", query.filter);
    }
    if (query.sorting) {
      params.append("sorting", query.sorting);
    }

    const url = `${this.baseUrl}?${params.toString()}`;
    return ApiClient.get<ListPaginate<T>>(url);
  }

  /**
   * Get entity by ID
   */
  async getById(id: string | number): Promise<ApiResult<T>> {
    const url = `${this.baseUrl}/${id}`;
    return ApiClient.get<T>(url);
  }

  /**
   * Get entity by slug
   */
  async getBySlug(slug: string): Promise<ApiResult<T>> {
    const url = `${this.baseUrl}/slug/${slug}`;
    return ApiClient.get<T>(url);
  }

  /**
   * Create new entity
   */
  async create(data: TCreate): Promise<ApiResult<T>> {
    return ApiClient.post<T>(this.baseUrl, data);
  }

  /**
   * Update entity
   */
  async update(id: string | number, data: TUpdate): Promise<ApiResult<T>> {
    const url = `${this.baseUrl}/${id}`;
    return ApiClient.put<T>(url, data);
  }

  /**
   * Delete entity
   */
  async delete(id: string | number): Promise<ApiResult<void>> {
    const url = `${this.baseUrl}/${id}`;
    return ApiClient.delete<void>(url);
  }

  /**
   * Get all entities (without pagination)
   */
  async getAll(): Promise<ApiResult<T[]>> {
    const url = `${this.baseUrl}/all`;
    return ApiClient.get<T[]>(url);
  }
}
