import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export abstract class BaseEntityDto {}

export abstract class BaseCreateDto extends BaseEntityDto {}

export abstract class BaseUpdateDto extends BaseCreateDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
