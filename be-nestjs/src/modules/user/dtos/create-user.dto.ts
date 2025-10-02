import { USER_NAME_REGEX } from '@app/constant/app.constant';
import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { IsValidPhone } from '@common/request/validations/request.valid-phone.validation';
import { normalizePhone } from '@common/utils/string.util';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ProfileDto {
  @IsNotEmpty()
  @MaxLength(255)
  full_name: string;

  @Transform(({ value }) => normalizePhone(value))
  @IsOptional()
  @IsValidPhone()
  phone: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(USER_NAME_REGEX)
  @Transform(({ value }) => value?.toString()?.trim()?.toLowerCase())
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsEnumValue(EStatus)
  status: EStatus;

  @IsOptional()
  @IsInt({ each: true })
  role_ids: number[];

  @Type(() => ProfileDto)
  @ValidateNested({ each: true })
  profile: ProfileDto;
}
