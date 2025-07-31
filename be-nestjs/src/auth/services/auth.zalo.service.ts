import { EStatus } from '@app/constant/app.enum';
import { ZaloProfile } from '@auth/types/auth.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { padStart } from '@common/utils/object.util';
import { hashPassword } from '@common/utils/string.util';
import { RoleRepository } from '@modules/role/repository/repositories/role.repository';
import { Profile } from '@modules/user/repository/entities/profile.entity';
import { User } from '@modules/user/repository/entities/user.entity';
import { ProfileRepository } from '@modules/user/repository/repositories/profile.repository';
import { UserRepository } from '@modules/user/repository/repositories/user.repository';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthZaloService {
  private readonly authMessage: MessageService;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly httpService: HttpService,
    i18nService: I18nService,
  ) {
    this.authMessage = new MessageService(i18nService, 'auth');
  }

  async zaloAuthenticate(access_token: string): Promise<User> {
    const zalo_profile = await this._getZaloProfile(access_token);

    if (!zalo_profile?.full_name?.trim()) {
      throw new CustomError(
        400,
        'LOGIN_ZALO_FAILED',
        this.authMessage.get('LOGIN_ZALO_MISSING_NAME'),
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        profile: {
          zalo_id: zalo_profile.id,
        },
      },
      relations: ['profile', 'user_roles', 'user_roles.role'],
    });

    if (!user) {
      const [role, defaultPass] = await Promise.all([
        this.roleRepository.findOne({
          where: { slug: 'user_standard' },
        }),
        this.cacheManager.get('DEFAULT_PASSWORD'),
      ]);

      const count = await this.userRepository.count({ withDeleted: true });
      const code = padStart(String(count + 1), 8, '0');

      const body: User = {
        username: `novo_nordisk_${zalo_profile.id}`,
        password:
          defaultPass || (await hashPassword(new Date().getTime().toString())),
        profile: {
          full_name: zalo_profile.full_name,
          avatar: zalo_profile.avatar,
          zalo_id: zalo_profile.id,
          code,
        } as Profile,
        user_roles: [
          {
            role: role,
          },
        ],
      } as User;

      return await this.userRepository.save(body);
    }

    if (
      user?.profile &&
      (!user.profile.full_name || !user.profile.avatar) &&
      (zalo_profile.full_name || zalo_profile.avatar)
    ) {
      await this.profileRepository.update(
        { user_id: user.id },
        { full_name: zalo_profile.full_name, avatar: zalo_profile.avatar },
      );
    }

    if (user.status === EStatus.inactive) {
      throw new CustomError(
        401,
        'ACCOUNT_INACTIVE',
        this.authMessage.get('ACCOUNT_INACTIVE'),
      );
    }

    return user;
  }

  private async _getZaloProfile(access_token: string): Promise<ZaloProfile> {
    const { data: result } = await firstValueFrom(
      this.httpService
        .get('https://graph.zalo.me/v2.0/me', {
          params: {
            fields: 'id,name,picture',
          },
          headers: {
            access_token: access_token,
          },
        })
        .pipe(
          catchError((error) => {
            if (error.response) {
              const { data, status } = error.response;
              throw new CustomError(status, data?.errorCode, data?.message);
            }
            throw error;
          }),
        ),
    );

    if (result.error !== 0) {
      throw new CustomError(
        401,
        'LOGIN_ZALO_FAILED',
        this.authMessage.get('LOGIN_ZALO_FAILED'),
      );
    }

    return {
      id: result.id,
      full_name: result.name,
      avatar: result.picture?.data?.url || '',
    };
  }
}
