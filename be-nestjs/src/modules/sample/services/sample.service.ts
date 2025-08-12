import { ListPaginate } from '@common/database/types/database.type';
import { wrapPagination } from '@common/utils/object.util';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSampleDto } from '../dtos/create-sample.dto';
import { FilterSampleDto } from '../dtos/filter-sample.dto';
import { UpdateSampleDto } from '../dtos/update-sample.dto';
import { Sample } from '../repository/entities/sample.entity';
import { SampleRepository } from '../repository/repositories/sample.repository';

@Injectable()
export class SampleService {
  constructor(private readonly sampleRepository: SampleRepository) {}

  async create(createSampleDto: CreateSampleDto): Promise<Sample> {
    // Check if slug already exists
    const existingSample = await this.sampleRepository.findOne({
      where: { slug: createSampleDto.slug },
    });

    if (existingSample) {
      throw new ConflictException('Sample with this slug already exists');
    }

    const sample = this.sampleRepository.create(createSampleDto);
    return this.sampleRepository.save(sample);
  }
  async getList(params: FilterSampleDto): Promise<ListPaginate<Sample>> {
    const [data, count] = await this.sampleRepository.getList(params);

    return wrapPagination<Sample>(data, count, params);
  }

  async findOne(id: number): Promise<Sample> {
    const sample = await this.sampleRepository.findOne({
      where: { id },
      relations: ['ward', 'category', 'creator'],
    });

    if (!sample) {
      throw new NotFoundException('Sample not found');
    }

    return sample;
  }

  async update(id: number, updateSampleDto: UpdateSampleDto): Promise<Sample> {
    const sample = await this.findOne(id);

    // Check if slug already exists (excluding current sample)
    if (updateSampleDto.slug) {
      const existingSample = await this.sampleRepository.findOne({
        where: { slug: updateSampleDto.slug },
      });

      if (existingSample && existingSample.id !== id) {
        throw new ConflictException('Sample with this slug already exists');
      }
    }

    Object.assign(sample, updateSampleDto);
    return this.sampleRepository.save(sample);
  }

  async remove(id: number): Promise<void> {
    const sample = await this.findOne(id);
    await this.sampleRepository.remove(sample);
  }

  async findBySlug(slug: string): Promise<Sample> {
    const sample = await this.sampleRepository.findOne({
      where: { slug },
      relations: ['ward', 'category', 'creator'],
    });

    if (!sample) {
      throw new NotFoundException('Sample not found');
    }

    return sample;
  }

  async findByCategory(categoryId: number): Promise<Sample[]> {
    return this.sampleRepository.find({
      where: { category: { id: categoryId } },
      relations: ['ward', 'category', 'creator'],
    });
  }

  async findByWard(wardId: number): Promise<Sample[]> {
    return this.sampleRepository.find({
      where: { ward: { id: wardId } },
      relations: ['ward', 'category', 'creator'],
    });
  }
}
