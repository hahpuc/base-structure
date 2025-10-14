import { BaseOption } from "@/types/base";

import { BaseService } from "./base.service";
import { ApiResult } from "./client/api-result";
import { ApiClient } from "./client/axios-client";
import {
  CreateTranslationNamespace,
  EditTranslationNamespace,
  QueryTranslationNamespace,
  TranslationNamespaceDto,
} from "@/types/translation";

const API_PREFIX = "/admin";

class TranslationNamespaceService extends BaseService<
  number,
  TranslationNamespaceDto,
  CreateTranslationNamespace,
  EditTranslationNamespace,
  QueryTranslationNamespace
> {
  constructor() {
    super(API_PREFIX, "namespaces");
  }

  getOptions(): Promise<ApiResult<BaseOption[]>> {
    return ApiClient.get(`${this.apiUrl}/options`);
  }
}

export const translationNamespaceService = new TranslationNamespaceService();
