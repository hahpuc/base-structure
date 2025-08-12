import { EStatus } from '../constants/enum';

import { BaseModel, BaseQuery } from './base';
import { CategoryDto } from './category';
import { WardDto } from './ward';
import { UserDto } from './user';

export enum ESampleType {
  event,
  promotion,
  news,
  announcement,
}

export type SampleDto = BaseModel & {
  name: string;
  slug: string;
  content: string;
  image?: string;
  start_time: Date | string;
  end_time: Date | string;
  type: ESampleType;
  color?: string;
  tags?: string[];
  status: EStatus;
  ward_id?: number;
  category_id?: number;
  creator_id?: string;
  ward?: WardDto;
  category?: CategoryDto;
  creator?: UserDto;
};

export type CreateSample = {
  name: string;
  slug: string;
  content: string;
  image?: string;
  start_time: string;
  end_time: string;
  type: ESampleType;
  color?: string;
  tags?: string[];
  status: EStatus;
  ward_id?: number;
  category_id?: number;
  creator_id?: string;
};

export type EditSample = Partial<CreateSample> & {
  id: number;
};

export type QuerySample = BaseQuery & {
  status?: EStatus;
  type?: ESampleType;
  category_id?: number;
  ward_id?: number;
  province_id?: number;
  creator_id?: string;
  start_time?: string;
  end_time?: string;
};
