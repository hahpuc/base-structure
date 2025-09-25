import { EStatus } from '../constants/enum';

import { BaseModel, BaseQuery } from './base';

export type LanguageDto = BaseModel & {
  code: string;
  name: string;
  native_name: string;
  flag_code: string;
  flag_icon?: string;
  is_rtl: boolean;
  status: EStatus;
};

export type CreateLanguage = {
  code: string;
  name: string;
  native_name: string;
  flag_code: string;
  is_rtl: boolean;
  status: EStatus;
};

export type EditLanguage = Partial<CreateLanguage> & {
  id: number;
};

export type QueryLanguage = BaseQuery & {
  status?: EStatus;
};
