import { apiService } from './api.service';

export class PermissionsService {
  private static instance: PermissionsService;
  private currentPermissions: string[] = [];
  private readonly apiUrl: string = '/admin/permissions'; // Adjust base URL as needed

  private constructor() {}

  static getInstance() {
    if (!PermissionsService.instance) {
      PermissionsService.instance = new PermissionsService();
    }
    return PermissionsService.instance;
  }

  clearPermissions() {
    this.currentPermissions = [];
  }

  async getMyPermissions(): Promise<string[]> {
    return await apiService.get<string[]>(`${this.apiUrl}/my-permission`);
  }

  async getList(): Promise<any> {
    return await apiService.get(`${this.apiUrl}`);
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
