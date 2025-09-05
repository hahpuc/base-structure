import type { Permission } from '@/types/permission';

import { ApiClient } from './client/api-client';

class PermissionService {
  private readonly baseUrl = '/permissions';

  async getPermissions() {
    return await ApiClient.get<Permission[]>(this.baseUrl);
  }

  async getUserPermissions(userId: string) {
    return await ApiClient.get<string[]>(`${this.baseUrl}/user/${userId}`);
  }
}

export const permissionService = new PermissionService();
