import { StringDict } from '@app/types/app.type';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExcelService } from '@common/excel/services/excel.service';
import { BaseImportDto } from '@common/request/dtos/import.dto';
import {
  BaseImportResponse,
  ExportResponse,
} from '@common/response/types/base.reponse.type';
import { S3Service } from '@common/s3/services/s3.service';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';

import { CreateTranslationDto } from '../dtos/translation/create-translation.dto';
import { FilterTranslationDto } from '../dtos/translation/filter-translation.dto';
import { ImportTranslationDto } from '../dtos/translation/import-translation.dto';
import { UpdateTranslationDto } from '../dtos/translation/update-translation.dto';
import { Language } from '../repository/entities/language.entity';
import { Translation } from '../repository/entities/translation.entity';
import { TranslationRepository } from '../repository/repositories/translation.repository';
import { CustomMessageService } from './custom-message.service';
import { I18nService } from './i18n.service';

@Injectable()
export class TranslationService {
  private customMessageService: CustomMessageService;

  constructor(
    private readonly translationRepository: TranslationRepository,
    private readonly excelService: ExcelService,
    private readonly s3Service: S3Service,
    i18nService: I18nService,
  ) {
    this.customMessageService = new CustomMessageService(
      i18nService,
      'translation',
    );
  }

  async create(input: CreateTranslationDto): Promise<number> {
    const { id } = await this.translationRepository.save(input);
    return id;
  }

  async getById(id: number): Promise<Translation> {
    const app = await this.translationRepository.findOneBy({ id });
    if (!app) {
      const message = await this.customMessageService.get('NOT_FOUND');
      throw new CustomError(404, 'NOT_FOUND', message);
    }
    return app;
  }

  async getList(
    params: FilterTranslationDto,
  ): Promise<ListPaginate<Translation>> {
    const [data, count] = await this.translationRepository.getList(params);

    return wrapPagination<Translation>(data, count, params);
  }

  async update(input: UpdateTranslationDto): Promise<void> {
    const app = await this.getById(input.id);

    Object.assign(app, { ...input });

    await this.translationRepository.save(app);
  }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.translationRepository.remove(app);
  }

  async createDefaultTranslations(languageId: number): Promise<void> {
    const defaultTranslations = await this.translationRepository.find({
      where: {
        language: { code: 'en' },
      },
    });

    const newTranslations: Translation[] = [];

    // Create new translations for the specified language
    for (const translation of defaultTranslations) {
      const item = new Translation();

      Object.assign(item, {
        key: translation.key,
        value: translation.value,
        description: translation.description,
        namespace_id: translation.namespace_id,
        language_id: languageId,
      });

      newTranslations.push(item);
    }

    if (newTranslations.length > 0) {
      await this.translationRepository.insert(newTranslations);
    }
  }

  // MARK: Export & Import
  async export(params: FilterTranslationDto): Promise<ExportResponse> {
    if (!params.language_id) {
      const message = await this.customMessageService.get('INVALID_REQUEST');

      throw new CustomError(HttpStatusCode.BadRequest, 'BAD_REQUEST', message);
    }

    const header: StringDict = {
      translation_id: 'ID',
      language_code: 'Language Code',
      language_name: 'Language Name',
      translation_key: 'Key',
      translation_value: 'Value',
      translation_description: 'Description',
    };

    const workbook = await this.excelService.exportDataToExcel(
      async (page, limit) => {
        params.page = page;
        params.limit = limit;

        const data = await this.translationRepository.getListExport(params);

        const formatData = data.map((item) => ({
          ...item,
        }));

        return [formatData, 0];
      },
      header,
      'Translation Data',
    );

    return {
      key: await this.excelService.uploadWorkBookToS3(workbook, 'translation'),
    };
  }

  async import(input: BaseImportDto): Promise<BaseImportResponse> {
    let error_key: string = undefined;

    try {
      // Step 1: Define validate header (including 'No' column from exported file)
      const validHeaders: StringDict = {
        no: 'No',
        translation_id: 'ID',
        language_code: 'Language Code',
        language_name: 'Language Name',
        translation_key: 'Key',
        translation_value: 'Value',
        translation_description: 'Description',
      };

      // Step 2: Get worksheet
      const worksheet = await this.excelService.getWorkSheet(
        input.key,
        validHeaders,
      );

      // Step 3: Process import data
      const [validData, errorData, validationDict] =
        await this.excelService.extractExcelData(
          ImportTranslationDto,
          worksheet,
          Object.keys(validHeaders),
          {
            asyncValidValues: {
              language_code: {
                dataSource: async (codes) =>
                  await this._getLanguagesByCode(codes),
                prop: 'code',
                customValidate: (data, languages) => {
                  return languages.some(
                    (lang) => lang.code === data.language_code,
                  );
                },
                errorConstraints: 'isInvalidLanguage',
              },
            },
          },
        );

      // Process valid data - create or update translations
      const results = await this._processTranslationData(
        validData as ImportTranslationDto[],
        validationDict,
      );

      // Step 4: Check error (if error list > 0 => write error to file and upload to s3 & return key)
      if (errorData.length > 0) {
        error_key = await this._generateErrorReport(
          errorData as (ImportTranslationDto & { errors: string })[],
          validHeaders,
        );
      }

      // Step 5: return result
      const successMessage =
        await this.customMessageService.get('IMPORT_SUCCESS');
      return {
        error_key: error_key || '',
        message: `${successMessage}. Created: ${results.created}, Updated: ${results.updated}, Errors: ${errorData.length}`,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Import Translation Error: ', error);
      const message = await this.customMessageService.get('IMPORT_FAILED');
      throw new CustomError(
        HttpStatusCode.BadRequest,
        'IMPORT_FAILED',
        `${message}: ${error}`,
      );
    }
  }

  // MARK: Import Helpers

  private async _getLanguagesByCode(codes: string[]): Promise<Language[]> {
    const uniqueCodes = [...new Set(codes)];
    const results = await this.translationRepository
      .createQueryBuilder('translation')
      .leftJoinAndSelect('translation.language', 'language')
      .where('language.code IN (:...codes)', { codes: uniqueCodes })
      .andWhere('language.status = :status', { status: 1 }) // Active status
      .getMany();

    // Extract unique languages from the results
    const languageMap = new Map<string, Language>();
    results.forEach((translation) => {
      if (translation.language) {
        languageMap.set(translation.language.code, translation.language);
      }
    });

    return Array.from(languageMap.values());
  }

  private async _processTranslationData(
    validData: ImportTranslationDto[],
    validationDict: any,
  ): Promise<{ created: number; updated: number }> {
    if (validData.length === 0) {
      return { created: 0, updated: 0 };
    }

    // Separate updates and creates for batch processing
    const updatesData = validData.filter((item) => item.translation_id);
    const createsData = validData.filter((item) => !item.translation_id);

    let created = 0;
    let updated = 0;

    // Process updates in batch
    if (updatesData.length > 0) {
      updated = await this._batchUpdateTranslations(updatesData);
    }

    // Process creates in batch
    if (createsData.length > 0) {
      created = await this._batchCreateTranslations(
        createsData,
        validationDict,
      );
    }

    return { created, updated };
  }

  private async _batchUpdateTranslations(
    updatesData: ImportTranslationDto[],
  ): Promise<number> {
    const updateIds = updatesData.map((item) => item.translation_id);

    // Fetch all existing translations in one query
    const existingTranslations = await this.translationRepository
      .createQueryBuilder('translation')
      .where('translation.id IN (:...ids)', { ids: updateIds })
      .getMany();

    // Create map for fast lookup
    const translationMap = new Map<number, Translation>();
    existingTranslations.forEach((translation) => {
      translationMap.set(translation.id, translation);
    });

    // Prepare batch updates
    const translationsToUpdate: Translation[] = [];
    updatesData.forEach((item) => {
      const existingTranslation = translationMap.get(item.translation_id);
      if (existingTranslation) {
        existingTranslation.value = item.translation_value;
        existingTranslation.description = item.translation_description;
        translationsToUpdate.push(existingTranslation);
      }
    });

    // Batch save all updates
    if (translationsToUpdate.length > 0) {
      await this.translationRepository.save(translationsToUpdate);
    }

    return translationsToUpdate.length;
  }

  private async _batchCreateTranslations(
    createsData: ImportTranslationDto[],
    validationDict: any,
  ): Promise<number> {
    // Build lookup conditions for duplicate checking
    const lookupConditions = createsData.map((item) => {
      const language = validationDict.language_code[item.language_code];
      return {
        key: item.translation_key,
        language_id: language.id,
      };
    });

    // Check for existing translations in one query
    const existingTranslations = await this.translationRepository
      .createQueryBuilder('translation')
      .where(
        lookupConditions
          .map(
            (_, index) =>
              `(translation.key = :key${index} AND translation.language_id = :languageId${index})`,
          )
          .join(' OR '),
        lookupConditions.reduce((params, condition, index) => {
          params[`key${index}`] = condition.key;
          params[`languageId${index}`] = condition.language_id;
          return params;
        }, {}),
      )
      .getMany();

    // Create set of existing key-language combinations for fast lookup
    const existingCombinations = new Set<string>();
    existingTranslations.forEach((translation) => {
      const combination = `${translation.key}-${translation.language_id}`;
      existingCombinations.add(combination);
    });

    // Prepare new translations (filter out duplicates)
    const newTranslations: Translation[] = [];
    createsData.forEach((item) => {
      const language = validationDict.language_code[item.language_code];
      const combination = `${item.translation_key}-${language.id}`;

      if (!existingCombinations.has(combination)) {
        const newTranslation = new Translation();
        newTranslation.key = item.translation_key;
        newTranslation.value = item.translation_value;
        newTranslation.description = item.translation_description;
        newTranslation.language_id = language.id;
        newTranslation.namespace_id = 1; // You may need to adjust this

        newTranslations.push(newTranslation);
      }
    });

    // Batch insert all new translations
    if (newTranslations.length > 0) {
      await this.translationRepository.insert(newTranslations);
    }

    return newTranslations.length;
  }

  private async _generateErrorReport(
    errorData: (ImportTranslationDto & { errors: string })[],
    validHeaders: StringDict,
  ): Promise<string> {
    // Add error column to headers
    const errorHeaders = {
      ...validHeaders,
      errors: 'Errors',
    };

    const errorWorkbook = this.excelService.writeDataToExcel(
      errorData,
      errorHeaders,
      'Import Errors',
    );

    return await this.excelService.uploadWorkBookToS3(
      errorWorkbook,
      'translation_import_errors',
    );
  }
}
