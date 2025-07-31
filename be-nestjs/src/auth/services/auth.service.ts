import { EStatus } from '@app/constant/app.enum';
import { ChangePasswordDto } from '@auth/dtos/change-password.dto';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyEmailTokenDto,
} from '@auth/dtos/forgot-password.dto';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { User } from '@modules/user/repository/entities/user.entity';
import { UserRepository } from '@modules/user/repository/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { EAuthType } from '../constants/auth.enum';
import { Token } from '../repository/entities/token.entity';
import { EmailTokenRepository } from '../repository/repositories/email-token.repository';
import { TokenRepository } from '../repository/repositories/token.repository';
import { AuthBody, AuthPayLoad, AuthToken, AuthUser } from '../types/auth.type';
import { AuthEmailTokenService } from './auth.email-token.service';
import { AuthPasswordService } from './auth.password.service';
import { AuthZaloService } from './auth.zalo.service';

@Injectable()
export class AuthService {
  private readonly messageService: MessageService;

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly emailTokenRepository: EmailTokenRepository,
    private readonly jwtService: JwtService,
    private readonly authPasswordService: AuthPasswordService,
    private readonly authZaloService: AuthZaloService,
    private readonly authEmailTokenService: AuthEmailTokenService,
    i18nService: I18nService,
  ) {
    this.messageService = new MessageService(i18nService, 'auth');
  }

  async authentication(body: AuthBody): Promise<AuthUser> {
    this._validateAuthenticate(body);

    let user: User;
    let isChangePassword = false;

    switch (body.grant_type) {
      case 'password':
        [user, isChangePassword] =
          await this.authPasswordService.passwordAuthenticate(
            body.username,
            body.password,
          );
        break;
      case 'zalo':
        user = await this.authZaloService.zaloAuthenticate(body.access_token);
        break;
    }

    const authUser: AuthUser = this._generateAuthUser(user, body);

    this._checkAdminAccess(authUser);
    authUser.is_change_password = isChangePassword;

    return authUser;
  }

  async verifyToken(
    userId: string,
    authToken: string,
    type: EAuthType,
  ): Promise<AuthUser> {
    const token = await this.tokenRepository.findOneBy({
      user_id: userId,
      [type === EAuthType.access ? 'access_token' : 'refresh_token']: authToken,
    });

    if (!token) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('TOKEN_INVALID'),
      );
    }

    const user = await this.userRepository.getUserByCredential(userId, 'id');

    if (!user || user.deleted_at) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('USER_NOT_FOUND'),
      );
    }

    if (user.status === EStatus.inactive) {
      throw new CustomError(
        401,
        'ACCOUNT_INACTIVE',
        this.messageService.get('ACCOUNT_INACTIVE'),
      );
    }

    return {
      id: user.id,
      full_name: user.profile?.full_name,
      username: user.username,
      email: user.email,
      roles: user.user_roles?.map((ur) => ur.role.slug),
      scope: token.scope,
    };
  }

  async token(user: AuthUser): Promise<AuthToken> {
    const { token: accessToken, expired: accessTokenExpiresAt } =
      this._generateToken(
        user,
        this.configService.get<string>('auth.jwt.accessSecret'),
        this.configService.get<number>('auth.jwt.accessLifeTime'),
      );

    const { token: refreshToken, expired: refreshTokenExpiresAt } =
      this._generateToken(
        user,
        this.configService.get<string>('auth.jwt.refreshSecret'),
        this.configService.get<number>('auth.jwt.refreshLifeTime'),
      );
    const token = new Token();

    Object.assign(token, {
      user_id: user.id,
      scope: user.scope,
      access_token: accessToken,
      access_token_expires_at: accessTokenExpiresAt,
      refresh_token: refreshToken,
      refresh_token_expires_at: refreshTokenExpiresAt,
    });

    await this.tokenRepository.save(token);

    return {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      user: {
        id: user.id,
        scope: user.scope,
        roles: user.roles,
        is_change_password: user.is_change_password,
      },
    };
  }

  async removeToken(token: string, type: EAuthType): Promise<void> {
    await this.tokenRepository.delete({
      [type === EAuthType.access ? 'access_token' : 'refresh_token']: token,
    });
  }

  async forgotPassword(body: ForgotPasswordDto): Promise<void> {
    const user = await this.userRepository.getUserByCredential(
      body.email,
      'email',
    );

    if (!user) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.messageService.get('USER_NOT_FOUND'),
      );
    }

    await this.authEmailTokenService.generateAndSendToken(user);
  }

  async verifyEmailToken(body: VerifyEmailTokenDto): Promise<void> {
    await this.authEmailTokenService.verifyToken(body.token);
  }

  async resetPassword(body: ResetPasswordDto): Promise<void> {
    const emailToken = await this.authEmailTokenService.getVerifiedToken(
      body.token,
    );

    await this.authPasswordService.resetPassword(
      emailToken.user_id,
      body.password,
    );
    await this.tokenRepository.delete({ user_id: emailToken.user_id });

    this.emailTokenRepository
      .update({ id: emailToken.id }, { status: EStatus.inactive })
      .then();
  }

  async changePassword(
    body: ChangePasswordDto,
    loggedUser: AuthUser,
  ): Promise<void> {
    await this.authPasswordService.changePassword(body, loggedUser);
    await this.tokenRepository.delete({ user_id: loggedUser.id });
  }

  private _generateAuthUser(user: User, body: AuthBody): AuthUser {
    return {
      id: user.id,
      full_name: user.profile?.full_name,
      username: user.username,
      email: user.email,
      roles: user.user_roles.map((ur) => ur.role.slug),
      scope: body.scope,
    };
  }

  private _checkAdminAccess(authUser: AuthUser): void {
    const isStandardUserWithAdminScope =
      authUser.roles.length === 1 &&
      authUser.roles[0] === 'user_standard' &&
      authUser.scope === 'admin';

    if (isStandardUserWithAdminScope) {
      throw new CustomError(
        403,
        'FORBIDDEN',
        this.messageService.get('FORBIDDEN'),
      );
    }
  }

  private _generateToken(
    user: AuthUser,
    secret: string,
    lifetime: number,
  ): { token: string; expired: Date } {
    const now = dayjs().unix();

    const payload: AuthPayLoad = {
      iat: now,
      uid: user.id,
      claims: {
        user_id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    return {
      token: this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: now + lifetime,
      }),
      expired: new Date((now + lifetime) * 1000),
    };
  }

  private _validateAuthenticate(body: AuthBody) {
    if (body.grant_type === 'password') {
      if (body.scope !== 'admin' || !body.password || !body.username) {
        throw new CustomError(
          401,
          'UNAUTHORIZED',
          this.messageService.get('INVALID_AUTH'),
        );
      }
    } else if (body.grant_type === 'zalo') {
      if (body.scope !== 'mini_app' || !body.access_token) {
        throw new CustomError(
          401,
          'UNAUTHORIZED',
          this.messageService.get('INVALID_AUTH'),
        );
      }
    } else {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('INVALID_GRANT_TYPE'),
      );
    }
  }
}
