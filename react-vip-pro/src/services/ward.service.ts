import { CreateWard, EditWard, QueryWard, WardDto } from "@/types/ward";
import { BaseService } from "./base.service";
import { ApiResult } from "./client/api-result";
import { ApiClient } from "./client/axios-client";

const API_PREFIX = "/admin";

class WardService extends BaseService<
  number,
  WardDto,
  CreateWard,
  EditWard,
  QueryWard
> {
  constructor() {
    super(API_PREFIX, "wards");
  }

  getAll(provinceId: number): Promise<ApiResult<WardDto[]>> {
    return ApiClient.get(`${this.apiUrl}/all?provinceId=${provinceId}`);
  }
}

export const wardService = new WardService();
