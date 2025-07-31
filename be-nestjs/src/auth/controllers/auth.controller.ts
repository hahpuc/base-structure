import { AUser } from '@common/request/decorators/params/request.params.decorator';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

import { EAuthType } from '../constants/auth.enum';
import { Auth, RefreshGuard } from '../decorators/auth.jwt.decorator';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyEmailTokenDto,
} from '../dtos/forgot-password.dto';
import { AuthLocalGuard } from '../guards/auth.local.guard';
import { AuthService } from '../services/auth.service';
import { AuthToken, AuthUser } from '../types/auth.type';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthLocalGuard)
  @Post('/token')
  async login(@AUser() user: AuthUser): Promise<AuthToken> {
    return this.authService.token(user);
  }

  @RefreshGuard()
  @Post('/refresh')
  async refresh(@AUser() user: AuthUser): Promise<AuthToken> {
    return this.authService.token(user);
  }

  @Auth()
  @Post('/revoke')
  async revoke(@Req() req: Request): Promise<void> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    return this.authService.removeToken(token, EAuthType.access);
  }

  @Post('/forgot')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(body);
  }

  @Post('/verify')
  async verifyEmailToken(@Body() body: VerifyEmailTokenDto): Promise<void> {
    return this.authService.verifyEmailToken(body);
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(body);
  }

  @Auth()
  @Post('/change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @AUser() user: AuthUser,
  ): Promise<void> {
    return this.authService.changePassword(body, user);
  }
}
