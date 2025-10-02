import { BaseFilterParamDto } from '@common/base/dtos/base-filter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FilterWardDto extends BaseFilterParamDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  province_id: number;

  @IsOptional()
  @IsInt({ each: true })
  @Transform(({ value }) => value.map(Number))
  @ApiProperty({ required: false })
  province_ids: number[];
}
