import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { BaseImportDto, BaseImportResponse, ExportDto } from '../types/base';
import {
  CreateTranslation,
  QueryTranslation,
  TranslationDto,
  UpdateTranslation,
} from '../types/translation';
import { getUrlParams } from '../utils/common-helper';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService extends AppBaseService<
  number,
  TranslationDto,
  CreateTranslation,
  UpdateTranslation,
  QueryTranslation
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'translations');
  }

  export(params: QueryTranslation): Observable<ExportDto> {
    return this.httpClient.get<ExportDto>(`${this.apiUrl}/export` + getUrlParams(params));
  }

  import(body: BaseImportDto): Observable<BaseImportResponse> {
    return this.httpClient.post<BaseImportResponse>(`${this.apiUrl}/import`, body);
  }
}
