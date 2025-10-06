import {
  CreateProvince,
  EditProvince,
  ProvinceDto,
  QueryProvince,
} from "@/types/province";

import { BaseService } from "./base.service";
import { ApiClient } from "./client/axios-client";
import { ApiResult } from "./client/api-result";

const API_PREFIX = "/admin";

class ProvinceService extends BaseService<
  number,
  ProvinceDto,
  CreateProvince,
  EditProvince,
  QueryProvince
> {
  constructor() {
    super(API_PREFIX, "provinces");
  }

  getAll(): Promise<ApiResult<ProvinceDto[]>> {
    return ApiClient.get(`${this.apiUrl}/all`);
  }
}

export const provinceService = new ProvinceService();
