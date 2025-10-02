import { ApiResult } from './client/api-result';
import { ApiClient } from './client/axios-client';

class PermissionsService {
  private currentPermissions: string[] = [];
  private readonly apiUrl: string = '/admin/permissions'; // Adjust base URL as needed

  clearPermissions() {
    this.currentPermissions = [];
  }

  async getMyPermissions(): Promise<ApiResult<string[]>> {
    return await ApiClient.get<string[]>(`${this.apiUrl}/my-permission`);
  }

  async getList(): Promise<ApiResult<string[]>> {
    return await ApiClient.get<string[]>(`${this.apiUrl}`);
  }

  checkPermissions(permissions: string[]): boolean {
    if (!this.currentPermissions.length) {
      return false;
    }

    if (!permissions.length) return true;
    return permissions.every(p => this.currentPermissions.includes(p));
  }

  checkAnyPermissions(permissions: string[]): boolean {
    if (!this.currentPermissions.length) {
      return false;
    }

    if (!permissions.length) return true;
    return permissions.some(p => this.currentPermissions.includes(p));
  }

  setPermissions(perms: string[]) {
    this.currentPermissions = perms;
  }

  getPermissions() {
    return this.currentPermissions;
  }
}

export const permissionService = new PermissionsService();
