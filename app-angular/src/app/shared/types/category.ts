import { EStatus } from '../constants/enum';

import { BaseModel, BaseQuery } from './base';

export type CategoryDto = BaseModel & {
  name: string;
  slug: string;
  description?: string;
  status: EStatus;
};

export type CreateCategory = {
  name: string;
  slug: string;
  description?: string;
  status: EStatus;
};

export type EditCategory = Partial<CreateCategory> & {
  id: number;
};

export type QueryCategory = BaseQuery & {
  status?: EStatus;
};
