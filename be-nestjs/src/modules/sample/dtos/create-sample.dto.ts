import { ESampleType, EStatus } from '@app/constant/app.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSampleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsDateString()
  start_time: string;

  @ApiProperty()
  @IsDateString()
  end_time: string;

  @ApiProperty({ enum: ESampleType })
  @IsEnum(ESampleType)
  type: ESampleType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ enum: EStatus })
  @IsEnum(EStatus)
  @IsOptional()
  status?: EStatus;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  ward_id?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  creator_id?: string;
}
