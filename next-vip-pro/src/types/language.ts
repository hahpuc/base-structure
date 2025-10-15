import { BaseModel } from "./base";

export type LanguageDto = BaseModel & {
  code: string;
  name: string;
  native_name: string;
  flag_code: string;
  flag_icon?: string;
  is_rtl: boolean;
  status: number;
};

export type TranslationData = Record<string, Record<string, string>>;
export type TranslationCache = Record<string, TranslationData>;

export type NamespaceDto = BaseModel & {
  name: string;
  description?: string;
  status: number;
};

export type TranslationDto = BaseModel & {
  key: string;
  value: string;
  language_code: string;
  namespace: string;
  description?: string;
  status: number;
};
