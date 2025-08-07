import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
