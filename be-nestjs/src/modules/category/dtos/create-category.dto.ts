import { SLUG_REGEX } from '@app/constant/app.constant';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @Matches(SLUG_REGEX)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  order_index: number;
}
