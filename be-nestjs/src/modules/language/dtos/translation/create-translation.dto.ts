import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  namespace_id: number;

  @ApiProperty({ example: 'hello_world' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  language_id: number;

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
