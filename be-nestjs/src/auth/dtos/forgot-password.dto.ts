import { STRONG_PASSWORD_REGEX } from '@app/constant/app.constant';
import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyEmailTokenDto {
  @IsJWT()
  @IsNotEmpty()
  token: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(STRONG_PASSWORD_REGEX)
  @MinLength(8)
  password: string;

  @IsJWT()
  @IsNotEmpty()
  token: string;
}
