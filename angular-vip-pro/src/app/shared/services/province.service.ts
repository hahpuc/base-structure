import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { CreateProvince, EditProvince, ProvinceDto, QueryProvince } from '../types/province';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService extends AppBaseService<
  number,
  ProvinceDto,
  CreateProvince,
  EditProvince,
  QueryProvince
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'provinces');
  }

  getAll(): Observable<ProvinceDto[]> {
    return this.httpClient.get<ProvinceDto[]>(this.apiUrl + `/all`);
  }
}
