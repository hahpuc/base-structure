import { AnyDict, StringArrDict } from '@app/types/app.type';

export type ExcelAsyncValidData =
  | string[]
  | {
      dataSource: any[];
      customValidate?: (data: any, dataSource: any[]) => boolean;
      errorConstraints?: string;
    };

export type ExcelValidConstraintDict = { [key: string]: ExcelAsyncValidData };

export type ExcelAsyncValidValueOptions = {
  dataSource: (rawValues: string[]) => Promise<any[]>;
  prop: string;
  customValidate?: (value: any, dataSource: any[]) => boolean;
  errorConstraints?: string;
};

export interface ExcelAsyncValidValues {
  data: ExcelAsyncValidData;
  dict: AnyDict;
}

export type ExcelAsyncValidValueOptionsDict = {
  [key: string]: ExcelAsyncValidValueOptions;
};

export type ExcelGetDataOptions = {
  uniqueHeader?: StringArrDict;
  asyncValidValues?: ExcelAsyncValidValueOptionsDict;
};

export type ExcelRowValidateOption = Omit<
  ExcelGetDataOptions,
  'asyncValidValues'
> & {
  validConstraint?: ExcelValidConstraintDict;
};
