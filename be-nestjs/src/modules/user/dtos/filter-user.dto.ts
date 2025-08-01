import { BaseFilterParamDto } from '@common/base/dtos/base-filter.dto';
import { IsArray, IsOptional } from 'class-validator';

export class FilterUserDto extends BaseFilterParamDto {
  @IsOptional()
  @IsArray()
  roles?: string[];
}

export class FilterZaloUserDto extends BaseFilterParamDto {}
