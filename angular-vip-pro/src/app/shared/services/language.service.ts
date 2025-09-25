import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

import { CreateLanguage, EditLanguage, LanguageDto, QueryLanguage } from '../types/language';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends AppBaseService<
  number,
  LanguageDto,
  CreateLanguage,
  EditLanguage,
  QueryLanguage
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'languages');
  }
}
