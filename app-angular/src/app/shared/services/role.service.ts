import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { AppBaseService } from '@services/app-base.service';

import { CreateRole, EditRole, QueryRole, RoleDto } from '../types/role';

@Injectable({ providedIn: 'root' })
export class RoleService extends AppBaseService<number, RoleDto, CreateRole, EditRole, QueryRole> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'roles');
  }

  export(): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.apiUrl}/export`, {
      responseType: 'blob' as 'json',
    });
  }
}
