import { AnyDict, StringArrDict, StringDict } from '@app/types/app.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import {
  ExcelAsyncValidData,
  ExcelAsyncValidValueOptions,
  ExcelAsyncValidValueOptionsDict,
  ExcelAsyncValidValues,
  ExcelGetDataOptions,
  ExcelRowValidateOption,
  ExcelValidConstraintDict,
} from '@common/excel/types/excel.type';
import { MessageService } from '@common/message/services/message.service';
import { S3Service } from '@common/s3/services/s3.service';
import { formatDateVN } from '@common/utils/date.util';
import { capitalizeText } from '@common/utils/string.util';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validate, ValidationError } from 'class-validator';
import Excel, { Row, Workbook, Worksheet } from 'exceljs';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ExcelService {
  excelMessage: MessageService;
  private validateMessage: MessageService;
  constructor(
    private readonly s3Service: S3Service,
    i18nService: I18nService,
  ) {
    this.excelMessage = new MessageService(i18nService, 'excel');
    this.validateMessage = new MessageService(i18nService, 'validate');
  }

  async getWorkSheet(
    key: string,
    validHeaders: StringDict,
  ): Promise<Worksheet> {
    const fileData = await this.s3Service.getFile(key);
    const workbook = new Excel.Workbook();
    const buffer = Buffer.from(fileData);
    await workbook.xlsx.load(buffer as any);

    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      throw new CustomError(
        400,
        'EXCEL_BAD_REQUEST',
        this.excelMessage.get('WORKSHEET_NOT_FOUND'),
      );
    }

    const headers = this.getExcelHeaders(worksheet);

    this.validateExcelHeader(headers, Object.values(validHeaders));

    return worksheet;
  }

  validateExcelHeader(header: string[], validHeader: string[]): void {
    if (
      JSON.stringify(header.map((v) => v.toString().toLowerCase().trim())) !==
      JSON.stringify(validHeader.map((v) => v.toLowerCase().trim()))
    ) {
      throw new CustomError(
        400,
        'IMPORT_HEADER_ERROR',
        this.validateMessage.get('VALIDATE.IMPORT_HEADER_ERROR'),
      );
    }
  }

  getExcelHeaders(worksheet: Worksheet): string[] {
    const firstRow: Row = worksheet.getRow(1);
    const headers: string[] = [];

    firstRow.eachCell((cell) => {
      headers.push(cell.value.toString());
    });

    return headers;
  }

  async extractExcelData<T>(
    cls: ClassConstructor<any>,
    worksheet: Worksheet,
    headers: string[],
    validateOptions?: ExcelGetDataOptions,
  ): Promise<[T[], (T & { errors: string })[], AnyDict]> {
    const validConstraintHeader: string[] =
      validateOptions && Object.keys(validateOptions?.asyncValidValues);

    const { rawData, rawConstraint } = this._extractWorkSheetData<T>(
      worksheet,
      headers,
      cls,
      validConstraintHeader,
    );

    const { validConstraint, validDict } = await this._getAsyncValidValue(
      rawConstraint,
      validateOptions?.asyncValidValues,
    );

    const { data, errorData } = await this._validateWorkSheetData<T>(rawData, {
      validConstraint,
      uniqueHeader: validateOptions?.uniqueHeader,
    });

    return [data, errorData, validDict];
  }

  async exportDataToExcel<T>(
    dataSource: (page: number, limit: number) => Promise<[T[], number]>,
    header: StringDict,
    workSheetName: string,
    styles?: StringDict,
  ): Promise<Workbook> {
    let count = 0;
    let page = 1;
    const limit = 500;
    let workbook: Workbook = null;

    while (count > -1) {
      const [data] = await dataSource(page, limit);

      workbook = this.writeDataToExcel(
        data,
        header,
        workSheetName,
        styles,
        workbook,
        count,
      );
      count = count + data.length;

      if (!data.length || data.length < limit) {
        count = -1;
      } else {
        page = page + 1;
      }
    }

    return workbook;
  }

  writeDataToExcel<T>(
    data: T[],
    header: StringDict,
    workSheetName: string,
    styles?: StringDict,
    workbook?: Workbook,
    count?: number,
  ): Workbook {
    let worksheet: Worksheet;
    if (!workbook) {
      workbook = new Excel.Workbook();
      worksheet = workbook.addWorksheet(workSheetName);
      const columns = !data?.[0]?.['errors']
        ? [{ header: 'No', key: 'no', width: 50 }]
        : [];

      Object.entries(header).forEach(([key, value]) => {
        columns.push({ header: value, key: key, width: 50 });
      });

      worksheet.columns = [...columns];
    } else {
      worksheet = workbook.getWorksheet(workSheetName);
    }

    data.forEach((d, i) => {
      if (styles) {
        Object.entries(styles).forEach(([key, value]) => {
          switch (value) {
            case 'date':
              d[key] = formatDateVN(d[key]);
              break;
            case 'uppercase':
              d[key] = d[key]?.toString()?.toUpperCase();
              break;
            case 'lowercase':
              d[key] = d[key]?.toString()?.toLowerCase();
              break;
          }
        });
      }

      worksheet.addRow({
        ...d,
        no: (count || 0) + i + 1,
      });
    });

    return workbook;
  }

  async uploadWorkBookToS3(workbook: Workbook, name?: string): Promise<string> {
    const buffer = await workbook.xlsx.writeBuffer();

    const file = new Blob([buffer]);

    return this.s3Service.uploadFile(
      file,
      `${Date.now()}_export_${name ?? workbook.getWorksheet(1).name}.xlsx`,
    );
  }

  streamWorkBookToResponse(workbook: Workbook, res: Response): void {
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${Date.now()}.xlsx`,
    );

    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  }

  private _extractWorkSheetData<T>(
    worksheet: Worksheet,
    headers: string[],
    cls: ClassConstructor<any>,
    validConstraintHeader?: string[],
  ): { rawData: T[]; rawConstraint: StringArrDict } {
    const rawData: T[] = [];
    const rawConstraint: StringArrDict = {};

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row: Row = worksheet.getRow(i);
      const rowData: AnyDict = {};

      row.eachCell((cell, colNumber) => {
        if (
          (cell.value !== null && cell.value !== undefined) ||
          (cell.value['text'] !== null && cell.value['text'] !== undefined)
        ) {
          const header = headers[colNumber - 1];
          if (typeof cell.value === 'object') {
            rowData[header] = cell.value['text'];
          } else {
            rowData[header] = cell.value;
          }

          if (validConstraintHeader?.includes(header)) {
            if (rawConstraint[header]) {
              rawConstraint[header] = [
                ...rawConstraint[header],
                rowData[header],
              ];
            } else {
              rawConstraint[header] = [rowData[header]];
            }
          }
        }
      });

      if (Object.values(rowData).length) {
        const excelRowDto: T = plainToClass(cls, rowData);
        rawData.push(excelRowDto);
      }
    }

    return { rawData, rawConstraint };
  }

  private async _validateWorkSheetData<T>(
    rawData: T[],
    validateOptions: ExcelRowValidateOption,
  ): Promise<{ data: T[]; errorData: (T & { errors: string })[] }> {
    const data: T[] = [];
    const errorData: (T & { errors: string })[] = [];

    for (const row of rawData) {
      const errors = await this._rowValidator(row as object, validateOptions);

      if (errors.length > 0) {
        row['errors'] = errors
          .map((error) =>
            capitalizeText(
              this.validateMessage.get(
                'VALIDATE.' + Object.keys(error.constraints)[0].toUpperCase(),
                'validate',
                {
                  field: this.validateMessage.get(
                    'FIELD.' + error.property?.toUpperCase(),
                  ),
                },
              ),
            ),
          )
          .join(', ');

        errorData.push(row as T & { errors: string });
      } else {
        data.push(row);

        if (validateOptions?.uniqueHeader) {
          Object.keys(validateOptions.uniqueHeader)?.forEach((key) => {
            if (validateOptions.uniqueHeader[key]) {
              validateOptions.uniqueHeader[key].push(row[key]);
            } else {
              validateOptions.uniqueHeader[key] = [row[key]];
            }
          });
        }
      }
    }

    return { data, errorData };
  }

  private async _rowValidator(
    data: object,
    options?: ExcelRowValidateOption,
  ): Promise<ValidationError[]> {
    const errors: ValidationError[] = await validate(data);

    const { uniqueHeader, validConstraint } = options;

    if (uniqueHeader) {
      Object.entries(uniqueHeader)?.forEach(([key, value]) => {
        if (data[key] && value?.includes(data[key])) {
          errors.push({
            property: key,
            constraints: {
              isUnique: key,
            },
          } as ValidationError);
        }
      });
    }

    if (validConstraint) {
      Object.entries(validConstraint)?.forEach(([key, value]) => {
        if (data[key]) {
          if (Array.isArray(value)) {
            if (!value?.includes(data[key]?.toString())) {
              errors.push({
                property: key,
                constraints: {
                  isInvalid: key,
                },
              } as ValidationError);
            }
          } else {
            if (!value.customValidate(data, value.dataSource)) {
              errors.push({
                property: key,
                constraints: {
                  [value.errorConstraints ?? 'isInvalid']: key,
                },
              } as ValidationError);
            }
          }
        }
      });
    }

    return errors;
  }

  private async _getAsyncValidValue(
    rawConstraint: StringArrDict,
    asyncValidValues: ExcelAsyncValidValueOptionsDict,
  ): Promise<{
    validConstraint: ExcelValidConstraintDict;
    validDict: AnyDict;
  }> {
    const validConstraint: ExcelValidConstraintDict = {};
    const validDict: AnyDict = {};

    if (Object.keys(rawConstraint).length !== 0) {
      const promiseDataSource = [];

      for (const [k, v] of Object.entries(asyncValidValues)) {
        promiseDataSource.push(
          this._handleAsyncValidValueDataSource(
            [...new Set(rawConstraint[k]).values()],
            v,
          ),
        );
      }

      const validDataSource: ExcelAsyncValidValues[] =
        await Promise.all(promiseDataSource);

      Object.keys(asyncValidValues).forEach((k, i) => {
        validConstraint[k] = validDataSource[i].data;
        validDict[k] = validDataSource[i].dict;
      });
    }

    return { validConstraint, validDict };
  }

  private async _handleAsyncValidValueDataSource(
    rawValues: string[],
    option: ExcelAsyncValidValueOptions,
  ): Promise<ExcelAsyncValidValues> {
    const { prop, dataSource, customValidate, errorConstraints } = option;

    const dto = await dataSource(rawValues);
    let validData: ExcelAsyncValidData;
    if (customValidate) {
      validData = {
        dataSource: dto,
        customValidate,
        errorConstraints,
      };
    } else {
      validData = dto.map((v) => v[prop]);
    }
    const validDict = dto.reduce((pre, cur) => {
      pre[cur[prop]] = cur;
      return pre;
    }, {});

    return { data: validData, dict: validDict };
  }
}
