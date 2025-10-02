import { EStatus } from '@app/constant/app.enum';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MailService } from '@common/mail/services/mail.service';
import { MessageService } from '@common/message/services/message.service';
import { formatDateVN } from '@common/utils/date.util';
import { User } from '@modules/user/repository/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';
import { IsNull, Not } from 'typeorm';

import { EmailToken } from '../repository/entities/email-token.entity';
import { EmailTokenRepository } from '../repository/repositories/email-token.repository';
import { EmailTokenPayload } from '../types/auth.email-token.type';

@Injectable()
export class AuthEmailTokenService {
  private readonly messageService: MessageService;

  constructor(
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailTokenRepository: EmailTokenRepository,
    i18nService: I18nService,
  ) {
    this.messageService = new MessageService(i18nService, 'auth');
  }

  async generateAndSendToken(user: User): Promise<void> {
    const payload: EmailTokenPayload = { email: user.email, user_id: user.id };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.get('auth.jwt.emailTokenSecret'),
    });

    const expiresAt = dayjs().add(1, 'd').toDate();

    await this.emailTokenRepository.delete(payload);

    await this.emailTokenRepository.save({
      ...payload,
      token,
      token_expires_at: expiresAt,
    });

    this.mailService.sendResetPassword({
      email: payload.email,
      url: this.configService.get('app.adminUrl'),
      token,
      expires_at: formatDateVN(expiresAt),
    });
  }

  async verifyToken(token: string): Promise<EmailToken> {
    try {
      const payload = await this.jwtService.verifyAsync<EmailTokenPayload>(
        token,
        {
          secret: this.configService.get('auth.jwt.emailTokenSecret'),
          ignoreExpiration: true,
        },
      );

      return await this._verifyTokenPayload(payload);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        this.emailTokenRepository
          .update({ token }, { status: EStatus.inactive })
          .then();
        throw new CustomError(
          401,
          'UNAUTHORIZED',
          this.messageService.get('TOKEN_EXPIRED'),
        );
      } else {
        throw new CustomError(
          401,
          'UNAUTHORIZED',
          this.messageService.get('TOKEN_INVALID'),
        );
      }
    }
  }

  async getVerifiedToken(token: string): Promise<EmailToken> {
    const emailToken = await this.emailTokenRepository.findOneBy({
      token,
      status: EStatus.active,
      verified_at: Not(IsNull()),
    });

    if (!emailToken) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('TOKEN_INVALID'),
      );
    }

    return emailToken;
  }

  private async _verifyTokenPayload(
    payload: EmailTokenPayload,
  ): Promise<EmailToken> {
    const emailToken = await this.emailTokenRepository.findOneBy({
      user_id: payload.user_id,
      email: payload.email,
      status: EStatus.active,
    });

    if (!emailToken) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('TOKEN_INVALID'),
      );
    }

    if (dayjs().isAfter(dayjs(emailToken.token_expires_at))) {
      throw new TokenExpiredError('JWT expired', new Date());
    } else {
      await this.emailTokenRepository.update(emailToken.id, {
        verified_at: new Date(),
      });
    }

    return emailToken;
  }
}
