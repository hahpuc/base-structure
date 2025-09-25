import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

import {
  CreateTranslationNamespace,
  EditTranslationNamespace,
  QueryTranslationNamespace,
  TranslationNamespaceDto,
} from '../types/translation';

import { AppBaseService } from './app-base.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationNamespaceService extends AppBaseService<
  number,
  TranslationNamespaceDto,
  CreateTranslationNamespace,
  EditTranslationNamespace,
  QueryTranslationNamespace
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apis.default.apiPrefix, 'namespaces');
  }
}
