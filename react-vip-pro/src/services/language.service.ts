import { BaseService } from "./base.service";
import { ApiClient } from "./client/axios-client";
import { ApiResult } from "./client/api-result";
import {
  CreateLanguage,
  EditLanguage,
  LanguageDto,
  QueryLanguage,
} from "@/types/language";
import { BaseOption } from "@/types/base";
import { TranslationData } from "@/types/translation";

const API_PREFIX = "/admin";

class LanguageService extends BaseService<
  number,
  LanguageDto,
  CreateLanguage,
  EditLanguage,
  QueryLanguage
> {
  constructor() {
    super(API_PREFIX, "languages");
  }

  ceateDefaultTranslations(body: CreateLanguage): Promise<ApiResult<unknown>> {
    return ApiClient.post<unknown>(
      `${this.apiUrl}/create-default-translations`,
      body
    );
  }

  getOptions(): Promise<ApiResult<BaseOption[]>> {
    return ApiClient.get<BaseOption[]>(`${this.apiUrl}/options`);
  }

  getAllLanguages(): Promise<ApiResult<LanguageDto[]>> {
    return ApiClient.get<LanguageDto[]>(`${this.apiUrl}/all`);
  }

  getAllTranslations(): Promise<ApiResult<Record<string, TranslationData>>> {
    return ApiClient.get<Record<string, TranslationData>>(
      `${this.apiUrl}/translations/all`
    );
  }
}

export const languageService = new LanguageService();
