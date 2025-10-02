import { STRONG_PASSWORD_REGEX } from '@app/constant/app.constant';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(STRONG_PASSWORD_REGEX)
  @MinLength(8)
  new_password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  current_password: string;
}
