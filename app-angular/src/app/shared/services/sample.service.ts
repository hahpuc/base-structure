import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

import { CreateSample, EditSample, QuerySample, SampleDto } from '../types/sample';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class SampleService extends AppBaseService<
  number,
  SampleDto,
  CreateSample,
  EditSample,
  QuerySample
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'samples');
  }
}
