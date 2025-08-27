import { ListPaginate } from '@/types/base';

import { ApiResult } from './client/api-result';
import { ApiClient } from './client/axios-client';

export class BaseService<
  TPrimaryKey,
  TEntityDto,
  TCreateEntityDto,
  TEditEntityDto,
  TQueryEntityDto,
> {
  protected readonly apiUrl: string;

  constructor(prefix: string, serviceName: string) {
    this.apiUrl = `${prefix}/${serviceName}`;
  }

  getByPaged(params?: TQueryEntityDto): Promise<ApiResult<ListPaginate<TEntityDto>>> {
    return ApiClient.get(`${this.apiUrl}`, { params });
  }

  getById(id: TPrimaryKey): Promise<ApiResult<TEntityDto>> {
    return ApiClient.get(`${this.apiUrl}/${id}`);
  }

  deleteById(id: TPrimaryKey): Promise<ApiResult<void>> {
    return ApiClient.delete(`${this.apiUrl}/${id}`);
  }

  create(body: TCreateEntityDto): Promise<ApiResult<TEntityDto>> {
    return ApiClient.post(`${this.apiUrl}`, body);
  }

  update(body: TEditEntityDto): Promise<ApiResult<TEntityDto>> {
    return ApiClient.put(`${this.apiUrl}`, body);
  }

  toggleStatus(id: TPrimaryKey): Promise<ApiResult<void>> {
    return ApiClient.put(`${this.apiUrl}/toggle/${id}`, {});
  }
}
