import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExcelService } from '@common/excel/services/excel.service';
import { MessageService } from '@common/message/services/message.service';
import { BaseImportDto } from '@common/request/dtos/import.dto';
import {
  BaseImportResponse,
  ExportResponse,
} from '@common/response/types/base.reponse.type';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CreateWardDto } from '../dtos/ward/create-ward.dto';
import { FilterWardDto } from '../dtos/ward/filter-ward.dto';
import { UpdateWardDto } from '../dtos/ward/update-ward.dto';
import { Ward } from '../repository/entities/ward.entity';
import { WardRepository } from '../repository/repositories/ward.repository';

@Injectable()
export class WardService {
  private wardMessage: MessageService;

  constructor(
    private readonly excelService: ExcelService,
    private readonly wardRepository: WardRepository,

    i18nService: I18nService,
  ) {
    this.wardMessage = new MessageService(i18nService, 'ward');
  }

  async getList(params: FilterWardDto): Promise<ListPaginate<Ward>> {
    const [data, count] = await this.wardRepository.getList(params);

    return wrapPagination<Ward>(data, count, params);
  }

  async create(input: CreateWardDto): Promise<void> {
    await this.wardRepository.save(input);
  }

  async update(input: UpdateWardDto): Promise<void> {
    const ward = await this.wardRepository.findOneBy({
      id: input?.id,
    });

    Object.assign(ward, { ...input });

    await this.wardRepository.save(input);
  }

  async getById(id: number): Promise<Ward> {
    const data = await this.wardRepository.findOne({
      where: { id },
      relations: ['district', 'district.province'],
    });
    if (!data) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.wardMessage.get('NOT_FOUND'),
      );
    }
    return data;
  }

  async getAll(provineId: number): Promise<Ward[]> {
    return await this.wardRepository.find({
      where: {
        province_id: provineId,
        status: EStatus.active,
      },
      order: {
        name: 'asc',
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);

    await this.wardRepository.delete(id);
  }

  async export(params: FilterWardDto): Promise<ExportResponse> {
    return {
      key: 'Not implemented',
    };
  }

  async import(input: BaseImportDto): Promise<BaseImportResponse> {
    return {
      error_key: 'Not implemented',
      message: 'Not implemented',
    };
  }

  async toggleStatus(id: number): Promise<void> {
    const data = await this.getById(id);
    const status = data.status === EStatus.active ? 0 : 1;
    await this.wardRepository.update({ id }, { status });
  }
}
