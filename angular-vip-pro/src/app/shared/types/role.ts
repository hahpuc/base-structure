import { BaseModel, BaseQuery } from '@shared/types/base';

import { EStatus } from '../constants/enum';

import { ListPermissionDto, PermissionRole } from './permission';

export type RoleDto = BaseModel & {
  name: string;
  slug: string;
  status: EStatus;
  role_permissions: PermissionRole[];
  permissions: ListPermissionDto;
};

export type CreateRole = {
  name: string;
  slug: string;
  status: EStatus;
  permission_ids: number[];
};

export type EditRole = CreateRole & {
  id: number | string;
};

export type QueryRole = BaseQuery;
