import { EStatus } from '@/app/shared/constants/enum';
import { BaseModel, BaseQuery } from '@shared/types/base';
import { RoleDto } from '@shared/types/role';

export type UserDto = BaseModel & {
  email: string;
  status: EStatus;
  username: string;
  created_at: Date;
  role: RoleDto;
  profile: ProfileDto;
};

export type ProfileDto = BaseModel & {
  user: UserDto;
  user_id: string;
  full_name: string;
  phone: string;
};

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  status: EStatus;
  role_id: number;
  profile: ProfileDto;
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
