import { VERIFY_EMAIL_REGEX } from '@app/constant/app.constant';
import { EStatus } from '@app/constant/app.enum';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { greaterThanNow } from '@common/utils/date.util';
import { comparePassword, hashPassword } from '@common/utils/string.util';
import { User } from '@modules/user/repository/entities/user.entity';
import { UserRepository } from '@modules/user/repository/repositories/user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { ChangePasswordDto } from '../dtos/change-password.dto';
import { AuthUser } from '../types/auth.type';

@Injectable()
export class AuthPasswordService {
  private readonly messageService: MessageService;

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    i18nService: I18nService,
  ) {
    this.messageService = new MessageService(i18nService, 'auth');
  }

  async passwordAuthenticate(
    username: string,
    password: string,
  ): Promise<[User, boolean]> {
    const emailReg = new RegExp(VERIFY_EMAIL_REGEX);
    const user = await this.userRepository.getUserByCredential(
      username,
      emailReg.test(username) ? 'email' : 'username',
      true,
    );

    if (!user || user.deleted_at) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('UNAUTHORIZED'),
      );
    }

    await this._checkPassword(user, password);
    await this._checkAccountStatus(user);

    if (user.login_failed > 0) {
      await this.userRepository.update({ id: user.id }, { login_failed: 0 });
    }

    return [user, await this._checkRequiredChangePassword(user)];
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.getUserByCredential(
      userId,
      'id',
      true,
    );

    if (!user || user.deleted_at) {
      throw new CustomError(
        401,
        'UNAUTHORIZED',
        this.messageService.get('UNAUTHORIZED'),
      );
    }

    const isSamePassword = await comparePassword(newPassword, user.password);

    if (isSamePassword) {
      throw new CustomError(
        400,
        'SAME_PASSWORD',
        this.messageService.get('SAME_PASSWORD'),
      );
    }

    await this.userRepository.update(
      { id: user.id },
      {
        password: await hashPassword(newPassword),
        change_password_at: new Date(),
      },
    );
  }

  async changePassword(
    input: ChangePasswordDto,
    loggedUser: AuthUser,
  ): Promise<void> {
    if (input.new_password === input.current_password) {
      throw new CustomError(
        400,
        'SAME_PASSWORD',
        this.messageService.get('SAME_PASSWORD'),
      );
    }

    await this.resetPassword(loggedUser.id, input.new_password);
  }

  private async _checkAccountStatus(user: User): Promise<void> {
    if (user.status === EStatus.inactive) {
      throw new CustomError(
        401,
        'ACCOUNT_INACTIVE',
        this.messageService.get('ACCOUNT_INACTIVE'),
      );
    }

    const isLock = await this.cacheManager.get<string>(`lock_${user.id}`);

    if (isLock) {
      throw new CustomError(
        401,
        'ACCOUNT_LOCK',
        this.messageService.get('ACCOUNT_LOCK'),
        { locked_end: isLock },
      );
    }
  }

  private async _checkPassword(user: User, password: string): Promise<void> {
    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      const maxLoginFail =
        +(await this.cacheManager.get<number>('MAX_LOGIN_FAIL'));

      const lockedEnd =
        user.login_failed + 1 > maxLoginFail
          ? dayjs().add(2, 'minute').toISOString()
          : undefined;

      await this._handleIncorrectLogin(user, lockedEnd);

      throw new CustomError(
        401,
        user.login_failed + 1 > maxLoginFail ? 'ACCOUNT_LOCK' : 'UNAUTHORIZED',
        this.messageService.get(
          user.login_failed + 1 > maxLoginFail
            ? 'ACCOUNT_LOCK'
            : 'UNAUTHORIZED',
        ),
        {
          locked_end: lockedEnd,
        },
      );
    }
  }

  private async _handleIncorrectLogin(
    user: User,
    lockedEnd?: string,
  ): Promise<void> {
    if (lockedEnd) {
      await Promise.all([
        this.cacheManager.set(`lock_${user.id}`, lockedEnd, 2 * 60000),
        this.userRepository.update({ id: user.id }, { login_failed: 0 }),
      ]);
    } else {
      await this.userRepository.update(
        { id: user.id },
        { login_failed: user.login_failed + 1 },
      );
    }
  }

  private async _checkRequiredChangePassword(user: User): Promise<boolean> {
    if (!user.change_password_at) {
      return true;
    }

    const passwordLifetime =
      +(await this.cacheManager.get('PASSWORD_LIFE_TIME'));
    return greaterThanNow(user.change_password_at, passwordLifetime);
  }
}
