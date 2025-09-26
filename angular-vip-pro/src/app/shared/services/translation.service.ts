import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

import {
  CreateTranslation,
  QueryTranslation,
  TranslationDto,
  UpdateTranslation,
} from '../types/translation';

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
}
