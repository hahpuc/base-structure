import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ImportWardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  ward_name: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  ward_status: EStatus;
}
