import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangePassword, CreateUser, EditUser, QueryUser, UserDto } from '@shared/types/user';
import { environment } from 'src/environments/environment';

import { AppBaseService } from './app-base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends AppBaseService<string, UserDto, CreateUser, EditUser, QueryUser> {
  userSimpleProfile: { name: string; role: string } = { name: '', role: '' };
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'users');
  }

  resetPassword(id: string): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + '/reset-password', { id });
  }

  resetLogin(id: string): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + `/reset-login/${id}`, {});
  }

  changePassword(body: ChangePassword): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + '/change-password', body);
  }

  getMyProfile(): Observable<UserDto> {
    return this.httpClient.get<UserDto>(this.apiUrl + `/my-profile`);
  }
}
