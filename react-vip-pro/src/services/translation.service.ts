import {
  CreateTranslation,
  QueryTranslation,
  TranslationDto,
  UpdateTranslation,
} from "@/types/translation";
import { BaseService } from "./base.service";
import { ApiResult } from "./client/api-result";
import { ApiClient } from "./client/axios-client";
import { BaseImportDto, BaseImportResponse, ExportDto } from "@/types/base";

const API_PREFIX = "/admin";

class TranslationService extends BaseService<
  number,
  TranslationDto,
  CreateTranslation,
  UpdateTranslation,
  QueryTranslation
> {
  constructor() {
    super(API_PREFIX, "translations");
  }

  export(params: QueryTranslation): Promise<ApiResult<ExportDto>> {
    return ApiClient.get<ExportDto>(`${this.apiUrl}/export`, { params });
  }

  import(body: BaseImportDto): Promise<ApiResult<BaseImportResponse>> {
    return ApiClient.post<BaseImportResponse>(`${this.apiUrl}/import`, body);
  }
}

export const translationService = new TranslationService();
