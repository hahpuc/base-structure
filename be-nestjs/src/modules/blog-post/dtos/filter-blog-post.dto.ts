import { BaseFilterParamDto } from '@common/base/dtos/base-filter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterBlogPostDto extends BaseFilterParamDto {
  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  category_id: number;
}
