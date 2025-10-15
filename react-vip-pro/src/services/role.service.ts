import type { RoleDto, CreateRole, EditRole, QueryRole } from "@/types/role";

import { BaseService } from "./base.service";
import { ApiClient } from "./client/axios-client";
import { ApiResult } from "./client/api-result";

const API_PREFIX = "/admin";

class RoleService extends BaseService<
  number,
  RoleDto,
  CreateRole,
  EditRole,
  QueryRole
> {
  constructor() {
    super(API_PREFIX, "roles");
  }

  async export(): Promise<ApiResult<Blob>> {
    return ApiClient.get(`${this.apiUrl}/export`, { responseType: "blob" });
  }

  async getAll(): Promise<ApiResult<RoleDto[]>> {
    return ApiClient.get(`${this.apiUrl}/all`);
  }
}

export const roleService = new RoleService();
