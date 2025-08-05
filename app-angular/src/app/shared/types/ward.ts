import { EStatus } from '../constants/enum';
import { BaseModel, BaseQuery } from './base';
import { ProvinceDto } from './province';

export type WardDto = BaseModel & {
  name: string;
  province_id: number;
  province: ProvinceDto;
  status: EStatus;
};

export type CreateWard = {
  name: string;
  province_id: number;
  status: EStatus;
};

export type EditWard = Partial<CreateWard> & {
  id: number;
};

export type QueryWard = BaseQuery & {
  status?: EStatus;
  province_id?: number;
  province_ids?: number[];
};
