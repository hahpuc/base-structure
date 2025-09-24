import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateTranslationDto } from './create-translation.dto';

export class UpdateTranslationDto extends PartialType(CreateTranslationDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiPropertyOptional({ example: 'Hello World!' })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiPropertyOptional({ example: 'Greeting message' })
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  status: EStatus;
}
