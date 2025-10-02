import { EStatus } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExcelService } from '@common/excel/services/excel.service';
import { MessageService } from '@common/message/services/message.service';
import { ExportResponse } from '@common/response/types/base.reponse.type';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CreateProvinceDto } from '../dtos/province/create-province.dto';
import { FilterProvinceDto } from '../dtos/province/filter-province.dto';
import { UpdateProvinceDto } from '../dtos/province/update-province.dto';
import { Province } from '../repository/entities/province.entity';
import { ProvinceRepository } from '../repository/repositories/province.repository';

@Injectable()
export class ProvinceService {
  private provinceMessage: MessageService;

  constructor(
    private readonly excelService: ExcelService,
    private readonly provinceRepository: ProvinceRepository,
    i18nService: I18nService,
  ) {
    this.provinceMessage = new MessageService(i18nService, 'province');
  }

  async create(input: CreateProvinceDto): Promise<void> {
    await this.provinceRepository.save(input);
  }

  async getList(params: FilterProvinceDto): Promise<ListPaginate<Province>> {
    const [data, count] = await this.provinceRepository.getList(params);

    return wrapPagination<Province>(data, count, params);
  }

  async getNotPermission(): Promise<Province[]> {
    return await this.provinceRepository.find();
  }

  async getAll(): Promise<Province[]> {
    return await this.provinceRepository.find({
      where: {
        status: EStatus.active,
      },
      order: {
        name: 'asc',
      },
    });
  }

  async getById(id: number): Promise<Province> {
    const data = await this.provinceRepository.findOne({
      where: {
        id,
      },
    });

    if (!data)
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.provinceMessage.get('NOT_FOUND'),
      );

    return data;
  }

  async update(input: UpdateProvinceDto): Promise<void> {
    const province = await this.getById(input.id);

    Object.assign(province, { ...input });

    await this.provinceRepository.save(province);
  }

  async export(params: FilterProvinceDto): Promise<ExportResponse> {
    return {
      key: 'Not implemented',
    };
  }

  async toggleStatus(id: number): Promise<void> {
    const data = await this.getById(id);

    const status = data.status === EStatus.active ? 0 : 1;
    await this.provinceRepository.update({ id }, { status });
  }
}
