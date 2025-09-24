import { EStatus } from '@app/constant/app.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'en', description: 'Language code' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  code: string;

  @ApiProperty({ example: 'English', description: 'Language name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'English', description: 'Native language name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  native_name: string;

  @ApiProperty({ example: 'us', description: 'Flag code' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  flag_code: string;

  @ApiPropertyOptional({
    example: 'https://example.com/flags/us.png',
    description: 'Flag icon path',
  })
  @IsString()
  @IsOptional()
  flag_icon?: string;

  @ApiProperty({ example: false, description: 'Is right-to-left language' })
  @IsBoolean()
  is_rtl: boolean;

  @ApiProperty({
    enum: EStatus,
    example: EStatus.active,
    description: 'Status',
  })
  @IsEnum(EStatus)
  status: EStatus;
}
