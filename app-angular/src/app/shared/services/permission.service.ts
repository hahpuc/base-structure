import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { ListPermissionDto, PermissionItem } from '@shared/types/permission';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  currentPermissions: string[] = [];
  private allPermissions: PermissionItem[] = [];
  protected readonly apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.apiUrl = environment.apis.default.apiPrefix + '/permissions';
  }

  get permissions(): PermissionItem[] {
    return this.allPermissions;
  }

  getMyPermission(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiUrl + `/my-permission`);
  }

  getList(): Observable<ListPermissionDto> {
    return this.httpClient.get<ListPermissionDto>(this.apiUrl);
  }

  async checkPermissions(permissions: string[]): Promise<boolean> {
    if (!this.currentPermissions.length) {
      this.currentPermissions = await lastValueFrom(this.getMyPermission());
    }

    if (!permissions.length) {
      return true;
    }

    return !!(
      this.currentPermissions.length && permissions.every(p => this.currentPermissions?.includes(p))
    );
  }
}
