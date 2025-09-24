import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({ example: 'common' })
  @IsString()
  @IsNotEmpty()
  namespace_id: string;

  @ApiProperty({ example: 'hello_world' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  language: string;

  @ApiProperty({ example: 'Hello World!' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({ example: 'Greeting message' })
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnumValue(EStatus)
  status: EStatus;
}
