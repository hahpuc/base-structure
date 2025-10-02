import { IsValidPhone } from '@common/request/validations/request.valid-phone.validation';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class ResetLockDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class FollowOADto {
  @IsNotEmpty()
  @IsString()
  zalo_follow_oa_id: string;
}

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsValidPhone()
  phone: string;
}
