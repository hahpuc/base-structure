import { ESampleType } from '@app/constant/app.enum';
import { BaseFilterParamDto } from '@common/base/dtos/base-filter.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterSampleDto extends BaseFilterParamDto {
  @ApiPropertyOptional({ enum: ESampleType })
  @IsEnum(ESampleType)
  @IsOptional()
  type?: ESampleType;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  category_id?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ward_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  creator_id?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  start_time?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  end_time?: string;
}
