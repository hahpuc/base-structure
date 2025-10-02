import { SLUG_REGEX } from '@app/constant/app.constant';
import { EStatus } from '@app/constant/app.enum';
import { IsEnumValue } from '@common/request/validations/request.enum-value.validation';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  title: string;

  @Matches(SLUG_REGEX)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsNumber()
  order_index: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsISO8601()
  published_at: Date;

  @IsEnumValue(EStatus)
  @IsNotEmpty()
  status: EStatus;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
