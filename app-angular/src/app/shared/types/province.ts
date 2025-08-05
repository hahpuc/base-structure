import { EStatus } from '../constants/enum';
import { BaseModel, BaseQuery } from './base';

export type ProvinceDto = BaseModel & {
  name: string;
  status: EStatus;
};

export type CreateProvince = {
  name: string;
  status: EStatus;
};

export type EditProvince = Partial<CreateProvince> & {
  id: number;
};

export type QueryProvince = BaseQuery & {
  status?: EStatus;
};
