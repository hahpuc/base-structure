/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { BaseCreateDto, BaseUpdateDto } from '../dtos/base.dto';
import { BaseFilterParamDto } from '../dtos/base-filter.dto';
import { BaseEntity } from '../repositories/entities/base.entity';

@Injectable()
export abstract class BaseService<
  TEntity extends BaseEntity,
  TCreateDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
  TFilterDto extends BaseFilterParamDto,
> {
  protected message: MessageService;

  constructor(
    private readonly repository: Repository<TEntity>,
    i18nService: I18nService,
    protected readonly messageNamespace: string = 'common',
  ) {
    this.message = new MessageService(i18nService, messageNamespace);
  }

  protected setMessageService(service: MessageService): void {
    this.message = service;
  }

  protected createMessageService(
    i18nService: I18nService,
    namespace: string,
  ): void {
    this.message = new MessageService(i18nService, namespace);
  }

  /**
   * Create a new entity
   */
  async create(input: TCreateDto): Promise<void> {
    // Pre-creation validation - override in child classes
    await this.beforeCreate(input);

    // Create entity instance
    const entity = this.repository.create();

    // Map input to entity
    Object.assign(entity, input);

    // Save entity
    await this.repository.save(entity);

    // Post-creation logic - override in child classes
    await this.afterCreate(entity, input);
  }

  /**
   * Update an existing entity
   */
  async update(input: TUpdateDto): Promise<void> {
    // Get existing entity
    const entity = await this.getById(input.id);

    // Pre-update validation - override in child classes
    await this.beforeUpdate(input, entity);

    // Map input to entity
    Object.assign(entity, input);

    // Save entity
    await this.repository.save(entity);

    // Post-update logic - override in child classes
    await this.afterUpdate(entity, input);
  }

  /**
   * Get paginated list of entities
   */
  async getList(params: TFilterDto): Promise<ListPaginate<TEntity>> {
    // Use repository's getList method if available, otherwise use basic find
    let data: TEntity[];
    let count: number;

    if (
      'getList' in this.repository &&
      typeof this.repository.getList === 'function'
    ) {
      [data, count] = await this.repository.getList(params);
    } else {
      // Fallback to basic pagination
      const take = params.limit || 10;
      const skip = params.page ? (params.page - 1) * take : 0;

      [data, count] = await this.repository.findAndCount({
        take,
        skip,
        order: { id: 'DESC' } as any,
      });
    }

    return wrapPagination<TEntity>(data, count, params);
  }

  /**
   * Get entity by ID
   */
  async getById(id: number | string): Promise<TEntity> {
    const entity = await this.repository.findOne({
      where: { id } as any,
    });

    if (!entity) {
      throw new CustomError(404, 'NOT_FOUND', this.message.get('NOT_FOUND'));
    }

    return entity;
  }

  /**
   * Delete an entity
   */
  async delete(id: number | string): Promise<void> {
    const entity = await this.getById(id);

    // Pre-delete validation - override in child classes
    await this.beforeDelete(entity);

    await this.repository.remove(entity);

    // Post-delete logic - override in child classes
    await this.afterDelete(entity);
  }

  /**
   * Toggle status of an entity
   */
  async toggleStatus(id: number | string): Promise<void> {
    const entity = await this.getById(id);

    // Check if entity has status field
    if (!('status' in entity)) {
      throw new CustomError(
        400,
        'STATUS_NOT_SUPPORTED',
        this.message.get('STATUS_NOT_SUPPORTED'),
      );
    }

    // Toggle status logic - override in child classes for custom status handling
    await this.handleToggleStatus(entity);

    await this.repository.save(entity);
  }

  // #region Hook Methods - Override in child classes for custom logic

  /**
   * Called before entity creation - override for validation
   */
  protected async beforeCreate(_input: TCreateDto): Promise<void> {
    // Override in child classes
  }

  /**
   * Called after entity creation - override for additional logic
   */
  protected async afterCreate(
    _entity: TEntity,
    _input: TCreateDto,
  ): Promise<void> {
    // Override in child classes
  }

  /**
   * Called before entity update - override for validation
   */
  protected async beforeUpdate(
    _input: TUpdateDto,
    _entity: TEntity,
  ): Promise<void> {
    // Override in child classes
  }

  /**
   * Called after entity update - override for additional logic
   */
  protected async afterUpdate(
    _entity: TEntity,
    _input: TUpdateDto,
  ): Promise<void> {
    // Override in child classes
  }

  /**
   * Called before entity deletion - override for validation
   */
  protected async beforeDelete(_entity: TEntity): Promise<void> {
    // Override in child classes
  }

  /**
   * Called after entity deletion - override for additional logic
   */
  protected async afterDelete(_entity: TEntity): Promise<void> {
    // Override in child classes
  }

  /**
   * Handle status toggle logic - override for custom status handling
   */
  protected async handleToggleStatus(entity: TEntity): Promise<void> {
    const currentStatus = (entity as any).status;

    // Default status toggle logic (0/1 or active/inactive)
    if (typeof currentStatus === 'number') {
      (entity as any).status = currentStatus === 1 ? 0 : 1;
    } else if (typeof currentStatus === 'string') {
      (entity as any).status =
        currentStatus === 'active' ? 'inactive' : 'active';
    }
  }

  // #endregion

  // #region Utility Methods

  /**
   * Get entity by field value
   */
  protected async getByField(
    field: keyof TEntity,
    value: any,
  ): Promise<TEntity | null> {
    return await this.repository.findOne({
      where: { [field]: value } as any,
    });
  }

  /**
   * Check if entity exists by field
   */
  protected async existsByField(
    field: keyof TEntity,
    value: any,
    excludeId?: number | string,
  ): Promise<boolean> {
    const whereCondition: any = { [field]: value };

    if (excludeId !== undefined) {
      whereCondition.id = { $ne: excludeId };
    }

    const count = await this.repository.count({
      where: whereCondition,
    });

    return count > 0;
  }

  /**
   * Bulk create entities
   */
  async bulkCreate(inputs: TCreateDto[]): Promise<void> {
    const entities = inputs.map((input) => {
      const entity = this.repository.create();
      Object.assign(entity, input);
      return entity;
    });

    await this.repository.save(entities);
  }

  /**
   * Bulk delete entities
   */
  async bulkDelete(ids: (number | string)[]): Promise<void> {
    const entities = await this.repository.find({
      where: { id: { $in: ids } } as any,
    });

    await this.repository.remove(entities);
  }

  /**
   * Get all entities without pagination
   */
  async getAll(): Promise<TEntity[]> {
    return await this.repository.find({
      order: { id: 'DESC' } as any,
    });
  }

  /**
   * Check if entity exists by ID
   */
  async exists(id: number | string): Promise<boolean> {
    const count = await this.repository.count({
      where: { id } as any,
    });

    return count > 0;
  }

  // #endregion
}
