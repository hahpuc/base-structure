import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class ImportTranslationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'No must be a valid number' })
  no?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'ID must be a valid number' })
  translation_id?: number;

  @IsNotEmpty({ message: 'Language Code is required' })
  @IsString({ message: 'Language Code must be a string' })
  @MaxLength(10, { message: 'Language Code must not exceed 10 characters' })
  language_code: string;

  @IsNotEmpty({ message: 'Language Name is required' })
  @IsString({ message: 'Language Name must be a string' })
  @MaxLength(100, { message: 'Language Name must not exceed 100 characters' })
  language_name: string;

  @IsOptional()
  @IsString({ message: 'Namespace Name must be a string' })
  @MaxLength(100, { message: 'Namespace Name must not exceed 100 characters' })
  @Matches(/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/, {
    message:
      'Namespace Name must be in snake_case format (lowercase letters, numbers, and underscores only, cannot start/end with underscore, no consecutive underscores)',
  })
  @Transform(({ value }) => value?.toString().trim() || null)
  namespace_name?: string;

  @IsNotEmpty({ message: 'Key is required' })
  @IsString({ message: 'Key must be a string' })
  @MaxLength(255, { message: 'Key must not exceed 255 characters' })
  translation_key: string;

  @IsNotEmpty({ message: 'Value is required' })
  @IsString({ message: 'Value must be a string' })
  @Transform(({ value }) => value?.toString().trim())
  translation_value: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Transform(({ value }) => value?.toString().trim() || null)
  translation_description?: string;
}
