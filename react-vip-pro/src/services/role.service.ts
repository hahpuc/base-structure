import type { RoleDto, CreateRole, EditRole, QueryRole } from '@/types/role';

import { BaseService } from './base.service';
import { ApiClient } from './client/axios-client';

const API_PREFIX = '/admin';

class RoleService extends BaseService<number, RoleDto, CreateRole, EditRole, QueryRole> {
  constructor() {
    super(API_PREFIX, 'roles');
  }

  export() {
    return ApiClient.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }

  getAll() {
    return ApiClient.get(`${this.apiUrl}/all`);
  }
}

export const roleService = new RoleService();
