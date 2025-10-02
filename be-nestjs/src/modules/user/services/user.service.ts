import { EStatus } from '@app/constant/app.enum';
import { AuthService } from '@auth/services/auth.service';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import {
  ECharset,
  generateCode,
  hashPassword,
} from '@common/utils/string.util';
import { RoleRepository } from '@modules/role/repository/repositories/role.repository';
import { SystemService } from '@modules/system/services/system.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { In } from 'typeorm';

import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import {
  FollowOADto,
  ResetLockDto,
  UpdateProfileDto,
  UpdateUserDto,
} from '../dtos/update-user.dto';
import { Profile } from '../repository/entities/profile.entity';
import { User } from '../repository/entities/user.entity';
import { ProfileRepository } from '../repository/repositories/profile.repository';
import { UserRepository } from '../repository/repositories/user.repository';

@Injectable()
export class UserService {
  private readonly userMessage: MessageService;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly systemService: SystemService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    i18nService: I18nService,
  ) {
    this.userMessage = new MessageService(i18nService, 'user');
  }

  async getList(params: FilterUserDto): Promise<ListPaginate<User>> {
    const [data, count] = await this.userRepository.getList(params);

    return wrapPagination<User>(data, count, params);
  }

  async create(input: CreateUserDto): Promise<void> {
    await this._checkDuplicateInfo(input);
    const password = await hashPassword(
      generateCode({ length: 10, charset: ECharset.alphanumeric }),
    );

    const roles = await this.roleRepository.find({
      where: { id: In(input.role_ids) },
    });

    if (roles.length !== input.role_ids.length) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.userMessage.get('NOT_FOUND'),
      );
    }

    if (!input.role_ids.length) {
      const role = await this.roleRepository.findOne({
        where: { slug: 'user_standard' },
      });
      roles.push(role);
    }

    const user = new User();

    Object.assign(user, {
      ...input,
      password,
      user_roles: roles.map((r) => ({
        role: r,
      })),
    });

    await this.userRepository.save(user);
    this.systemService.getValueByKey('AUTO_SEND_RESET_PASS').then((v) => {
      if (+v === 1) {
        this.authService.forgotPassword({ email: user.email }).then();
      }
    });
  }

  async update(input: UpdateUserDto): Promise<void> {
    const user = await this.getById(input.id);
    if (!user) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.userMessage.get('NOT_FOUND'),
      );
    }

    await this._checkDuplicateInfo(input, input?.id);

    const roles = await this.roleRepository.find({
      where: {
        id: In(input.role_ids),
      },
    });

    if (
      roles.findIndex((v) => v.slug === 'admin') > -1 &&
      input.status === EStatus.inactive
    ) {
      throw new CustomError(
        400,
        'NOT_ALLOW',
        this.userMessage.get('NOT_ALLOW'),
      );
    }

    Object.assign(user, {
      ...input,
      user_roles: roles.map((role) => ({ role: role })),
    });

    await this.userRepository.save(user);
  }

  async toggleStatus(id: string): Promise<void> {
    const user = await this.userRepository.getUserWithProfile(id, 'id');

    if (!user) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.userMessage.get('NOT_FOUND'),
      );
    }
    if (user.user_roles.findIndex((v) => v.role.slug === 'admin') > -1) {
      throw new CustomError(
        400,
        'NOT_ALLOW',
        this.userMessage.get('NOT_ALLOW'),
      );
    }
    const status = user.status === EStatus.active ? 0 : 1;
    await this.userRepository.update({ id }, { status });
  }

  async delete(id: string): Promise<void> {
    const user = await this.getById(id);
    if (user.user_roles.some((ur) => ur.role.slug === 'admin')) {
      throw new CustomError(
        400,
        'NOT_ALLOW',
        this.userMessage.get('NOT_ALLOW'),
      );
    }
    await this.userRepository.softDelete(user.id);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['user_roles', 'user_roles.role', 'profile'],
    });

    if (!user) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.userMessage.get('NOT_FOUND'),
      );
    }

    return user;
  }

  async myProfile(loggedUser: AuthUser): Promise<User> {
    return this.userRepository.getUserWithProfile(loggedUser.id, 'id');
  }

  async followOA(input: FollowOADto, loggedUser: AuthUser): Promise<void> {
    const profile = await this.getZaloUserById(loggedUser.id);

    if (!profile.zalo_follow_oa_id || !profile.phone) {
      await this.profileRepository.update(
        { user_id: loggedUser.id },
        {
          zalo_follow_oa_id: input.zalo_follow_oa_id,
          zalo_follow_at: profile?.zalo_follow_at ?? new Date(),
        },
      );
    }
  }

  async getZaloUserById(id: string): Promise<Profile> {
    const profile = await this.profileRepository.getZaloUserById(id);

    if (!profile) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.userMessage.get('NOT_FOUND'),
      );
    }

    return profile;
  }

  async updateProfile(
    input: UpdateProfileDto,
    loggedUser: AuthUser,
  ): Promise<void> {
    await this.profileRepository.update(
      { user_id: loggedUser.id },
      {
        phone: input.phone,
      },
    );
  }
  async resetLock(input: ResetLockDto): Promise<void> {
    await this.cacheManager.del(`lock_${input.id}`);
  }

  private async _checkDuplicateInfo(
    input: CreateUserDto | UpdateUserDto,
    id?: string,
  ): Promise<User | void> {
    const { email, username } = input;
    const users = await this.userRepository.find({
      where: [{ username }, { email }],
    });

    const duplicateUsername = users.find(
      (u) =>
        u.username.toLowerCase() === username?.toLowerCase() &&
        (id ? u.id !== id : true),
    );
    if (duplicateUsername) {
      throw new CustomError(
        400,
        'USERNAME_IN_USED',
        this.userMessage.get('USERNAME_IN_USED'),
      );
    }

    const duplicateEmail = users.find(
      (user) => user.email === email && (id ? user.id !== id : true),
    );

    if (duplicateEmail) {
      throw new CustomError(
        400,
        'EMAIL_IN_USED',
        this.userMessage.get('EMAIL_IN_USED'),
      );
    }
  }
}
