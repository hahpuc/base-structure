import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTranslationsDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiPropertyOptional({ example: 'common' })
  @IsString()
  @IsOptional()
  namespace?: string;
}

export class BulkTranslationDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ example: 'common' })
  @IsString()
  @IsNotEmpty()
  namespace: string;

  @ApiProperty({
    example: {
      hello_world: 'Hello World!',
      goodbye: 'Goodbye!',
    },
  })
  translations: Record<string, string>;
}
