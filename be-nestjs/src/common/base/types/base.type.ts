import { BaseFilterParamDto } from '@common/base/dtos/base-filter.dto';
import { ListPaginate } from '@common/database/types/database.type';
import { SelectQueryBuilder } from 'typeorm';

export type IBaseEntity = {
  id: number;
};

export type IBaseCreateDto = {
  [key: string]: any;
};

export type IBaseUpdateDto = IBaseCreateDto & {
  id: number;
};

export type IBaseFilterDto = BaseFilterParamDto & {
  [key: string]: any;
};

export type IBaseRepository<T extends IBaseEntity> = {
  create(entityLike: Partial<T>): T;
  save(entity: T | T[]): Promise<T>;
  findOne(options: any): Promise<T | null>;
  find(options?: any): Promise<T[]>;
  findAndCount(options?: any): Promise<[T[], number]>;
  update(criteria: any, partialEntity: any): Promise<any>;
  delete(criteria: any): Promise<any>;
  softDelete(criteria: any): Promise<any>;
  count(options?: any): Promise<number>;
  createQueryBuilder(alias: string): SelectQueryBuilder<T>;
  getList?(params: IBaseFilterDto): Promise<[T[], number]>;
};

export type IBaseService<
  TEntity extends IBaseEntity,
  TCreateDto extends IBaseCreateDto,
  TUpdateDto extends IBaseUpdateDto,
  TFilterDto extends IBaseFilterDto,
> = {
  create(input: TCreateDto): Promise<void>;
  update(input: TUpdateDto): Promise<void>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<TEntity>;
  getList(params: TFilterDto): Promise<ListPaginate<TEntity>>;
  getAll?(): Promise<TEntity[]>;
  toggleStatus?(id: number): Promise<void>;
};

export type IBaseController<
  TEntity extends IBaseEntity,
  TCreateDto extends IBaseCreateDto,
  TUpdateDto extends IBaseUpdateDto,
  TFilterDto extends IBaseFilterDto,
> = {
  create(body: TCreateDto): Promise<void>;
  update(body: TUpdateDto): Promise<void>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<TEntity>;
  getList(param: TFilterDto): Promise<ListPaginate<TEntity>>;
  getAll?(): Promise<TEntity[]>;
  toggleStatus?(id: number): Promise<void>;
};
