import { EStatus } from '../constants/enum';

import { BaseModel, BaseQuery } from './base';
import { LanguageDto } from './language';

// Namespace
export type TranslationNamespaceDto = BaseModel & {
  name: string;
  description?: string;
  status: EStatus;
};

export type CreateTranslationNamespace = {
  name: string;
  description?: string;
  status: EStatus;
};

export type EditTranslationNamespace = Partial<CreateTranslationNamespace> & {
  id: number;
};

export type QueryTranslationNamespace = BaseQuery & {
  status?: EStatus;
};

// Translation
export type TranslationDto = BaseModel & {
  language: LanguageDto;
  namespace: TranslationNamespaceDto;
  key: string;
  value: string;
  description?: string;
  status: EStatus;
};

export type CreateTranslation = {
  language_id: number;
  namespace_id: number;
  key: string;
  value: string;
  description?: string;
  status: EStatus;
};

export type UpdateTranslation = Partial<CreateTranslation> & {
  id: number;
};

export type QueryTranslation = BaseQuery & {
  language_id?: string;
  namespace_id?: string;
  key?: string;
  status?: EStatus;
};

// Usage For All Content in Admin
export type TranslationData = {
  [namespace: string]: {
    [key: string]: string;
  };
};
