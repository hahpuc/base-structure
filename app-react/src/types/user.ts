import { BaseModel, BaseQuery } from './base';
import { RoleDto } from './role';

import { EStatus } from '@/constants/enum';

export type UserDto = BaseModel & {
  email: string;
  status: EStatus;
  username: string;
  created_at: Date;
  user_roles: {
    role: RoleDto;
  }[];
  profile?: ProfileDto;
};

export type ProfileDto = BaseModel & {
  user?: UserDto;
  user_id?: string;
  full_name: string;
  phone: string;
};

export type CreateProfileDto = {
  full_name: string;
  phone: string;
};

export type CreateUser = {
  username: string;
  email: string;
  status: EStatus;
  role_ids: number[];
  profile: CreateProfileDto;
};

export type EditUser = Partial<CreateUser> & {
  id: string;
};
export type ChangePassword = {
  new_password: string;
  current_password: string;
};

export type QueryUser = BaseQuery & {
  roles?: string[];
  status?: EStatus;
};
