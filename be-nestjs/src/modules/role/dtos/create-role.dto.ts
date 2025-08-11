import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  slug: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  status: EStatus;

  @IsNotEmpty()
  @IsInt({ each: true })
  permission_ids: number[];
}
