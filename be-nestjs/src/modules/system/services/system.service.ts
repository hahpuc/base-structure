import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { hashPassword } from '@common/utils/string.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { FindOneOptions, In, Not } from 'typeorm';

import { CreateSystemDto } from '../dtos/create-system.dto';
import { FilterSystemDto } from '../dtos/filter-system.dto';
import { UpdateSystemDto } from '../dtos/update-system.dto';
import { System } from '../repository/entities/system.entity';
import { SystemRepository } from '../repository/repositories/system.repository';

@Injectable()
export class SystemService {
  private messageService: MessageService;
  private _specialKeys = [
    'DEFAULT_PASSWORD',
    'MAX_LOGIN_FAIL',
    'ZALO_OA_ID',
    'ZALO_APP_ID',
    'ZALO_APP_SECRET_KEY',
    'ZALO_OA_ACCESS_TOKEN',
    'ZALO_OA_REFRESH_TOKEN',
    'ZALO_TEMPLATE_ID',
    'MAX_ZNS_PER_DAY',
    'AUTO_SEND_RESET_PASS',
    'ALLOW_EDIT_PHONE',
  ];

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly systemRepository: SystemRepository,
    i18nService: I18nService,
  ) {
    this.messageService = new MessageService(i18nService, 'system');
  }

  async getList(params: FilterSystemDto): Promise<ListPaginate<System>> {
    const [data, count] = await this.systemRepository.getList(params);

    return wrapPagination<System>(data, count, params);
  }

  async create(input: CreateSystemDto): Promise<void> {
    await this._checkDuplicateKey(input.key);
    const obj = new System();
    Object.assign(obj, input);
    await this.systemRepository.save(obj);
  }

  async update(input: UpdateSystemDto): Promise<void> {
    if (input.id) {
      delete input.key;
    }
    const data = await this.systemRepository.findOne({
      where: [{ id: input.id }, { key: input.key }],
    });

    if (!data) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.messageService.get('NOT_FOUND'),
      );
    }
    await this.systemRepository.save(Object.assign(data, input));
    await this._cachingSpecialKey(data.key, data.value);
  }

  async getById(id: number): Promise<System> {
    const options: FindOneOptions<System> = { where: { id } };
    const data = await this.systemRepository.findOne(options);
    if (!data) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.messageService.get('NOT_FOUND'),
      );
    }
    return data;
  }

  async getByKey(key: string): Promise<System> {
    const options: FindOneOptions<System> = { where: { key } };
    const data = await this.systemRepository.findOne(options);
    if (!data) {
      throw new CustomError(404, 'NOT_FOUND', 'System not found !');
    }
    return data;
  }

  async getValueByKey(key: string, skipRevalidate?: boolean): Promise<string> {
    let value: string;
    let isCaching = false;

    if (this._specialKeys.includes(key)) {
      value = await this.cacheManager.get<string>(key);
      if (skipRevalidate) return value;
      isCaching = true;
    }

    if (!value) {
      const system = await this.getByKey(key);
      value = system?.value?.[0];

      if (isCaching) {
        this._cachingSpecialKey(key, value).then();
      }
    }

    return value;
  }

  async delete(id: number): Promise<void> {
    const data = await this.systemRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.messageService.get('NOT_FOUND'),
      );
    }

    await this.systemRepository.delete(id);
  }

  async getListPublic(): Promise<System[]> {
    return await this.systemRepository.find({
      where: { is_public: EStatus.active, status: EStatus.active },
    });
  }

  async getPublicByKey(key: string): Promise<System> {
    const data = await this.systemRepository.findOne({
      where: { is_public: EStatus.active, status: EStatus.active, key },
    });
    if (!data) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.messageService.get('NOT_FOUND'),
      );
    }
    return data;
  }

  async cachingDefaultValue(): Promise<void> {
    const systems = await this.systemRepository.findBy({
      key: In(this._specialKeys),
    });

    for (const system of systems) {
      await this._cachingSpecialKey(
        system.key,
        Array.isArray(system.value) ? system.value[0] : system.value,
      );
    }
  }

  private async _checkDuplicateKey(key: string, id?: number): Promise<void> {
    const system = await this.systemRepository.findOne({
      where: { key: key, id: Not(id || -1) },
    });

    if (system) {
      throw new CustomError(
        400,
        'KEY_INVALID',
        this.messageService.get('KEY_INVALID'),
      );
    }
  }

  private async _cachingSpecialKey(key: string, value: string): Promise<void> {
    switch (key) {
      case 'DEFAULT_PASSWORD':
        const hash = await hashPassword(value);
        await this.cacheManager.set(key, hash);
        break;
      case 'ZALO_OA_ACCESS_TOKEN':
        await this.cacheManager.set(key, value, 9000 * 1000);
        break;
      case 'ZALO_OA_REFRESH_TOKEN':
        await this.cacheManager.set(key, value, 30 * 86400 * 1000);
        break;
      default:
        await this.cacheManager.set(key, value);
        break;
    }
  }
}
