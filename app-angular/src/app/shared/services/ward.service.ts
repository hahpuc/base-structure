import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

import { CreateWard, EditWard, QueryWard, WardDto } from '../types/ward';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class WardService extends AppBaseService<number, WardDto, CreateWard, EditWard, QueryWard> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'wards');
  }
}
