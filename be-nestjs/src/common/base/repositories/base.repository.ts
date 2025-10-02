import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export abstract class BaseRepository<
  TEntity extends BaseEntity,
> extends Repository<TEntity> {
  protected abstract entityName: string;

  constructor(
    protected entityClass: new () => TEntity,
    protected dataSource: DataSource,
  ) {
    super(entityClass, dataSource.createEntityManager());
  }

  //   /**
  //    * Get paginated list with filtering and sorting
  //    */
  //   async getList(params: BaseFilterParamDto): Promise<[TEntity[], number]> {
  //     const query = this.createQueryBuilder(this.entityName);

  //     // Apply custom filters - override in child classes
  //     this.applyFilters(query, params);

  //     // Apply sorting
  //     applyQuerySorting(params.sorting, query, this.entityName);

  //     // Apply pagination
  //     applyQueryPaging(params, query);

  //     return await query.getManyAndCount();
  //   }

  //   /**
  //    * Apply custom filters to query - override in child classes
  //    */
  //   protected applyFilters(
  //     query: SelectQueryBuilder<TEntity>,
  //     params: BaseFilterParamDto,
  //   ): void {
  //     // Override in child classes to add specific filtering logic
  //     // Example:
  //     // if (params.status) {
  //     //   query.andWhere(`${this.entityName}.status = :status`, { status: params.status });
  //     // }
  //   }

  //   /**
  //    * Get entity by ID with optional relations
  //    */
  //   async getById(id: number, relations?: string[]): Promise<TEntity | null> {
  //     const options: any = { where: { id } };
  //     if (relations?.length) {
  //       options.relations = relations;
  //     }
  //     return await this.findOne(options);
  //   }

  //   /**
  //    * Soft delete entity by ID
  //    */
  //   async softDeleteById(id: number): Promise<void> {
  //     await this.softDelete(id);
  //   }

  //   /**
  //    * Restore soft deleted entity by ID
  //    */
  //   async restoreById(id: number): Promise<void> {
  //     await this.restore(id);
  //   }

  //   /**
  //    * Check if entity exists by ID
  //    */
  //   async existsById(id: number): Promise<boolean> {
  //     const count = await this.count({
  //       where: { id } as FindOptionsWhere<TEntity>,
  //     });
  //     return count > 0;
  //   }

  //   /**
  //    * Get all entities with optional relations
  //    */
  //   async getAll(relations?: string[]): Promise<TEntity[]> {
  //     const options: any = {};
  //     if (relations?.length) {
  //       options.relations = relations;
  //     }
  //     return await this.find(options);
  //   }

  //   /**
  //    * Get entities by IDs
  //    */
  //   async getByIds(ids: number[], relations?: string[]): Promise<TEntity[]> {
  //     const options: any = { where: { id: In(ids) } };
  //     if (relations?.length) {
  //       options.relations = relations;
  //     }
  //     return await this.find(options);
  //   }

  //   /**
  //    * Create and save entity
  //    */
  //   async createAndSave(entityLike: DeepPartial<TEntity>): Promise<TEntity> {
  //     const entity = this.create(entityLike);
  //     return await this.save(entity);
  //   }

  //   /**
  //    * Update entity by ID
  //    */
  //   async updateById(
  //     id: number,
  //     updateData: DeepPartial<TEntity>,
  //   ): Promise<void> {
  //     await this.update(id, updateData as any);
  //   }

  //   /**
  //    * Count entities with optional conditions
  //    */
  //   async countWithConditions(
  //     conditions?: FindOptionsWhere<TEntity>,
  //   ): Promise<number> {
  //     return await this.count({ where: conditions });
  //   }

  //   /**
  //    * Find entities with custom query builder
  //    */
  //   protected createBaseQuery(): SelectQueryBuilder<TEntity> {
  //     return this.createQueryBuilder(this.entityName);
  //   }

  //   /**
  //    * Get entities by field value
  //    */
  //   async getByField(field: keyof TEntity, value: any): Promise<TEntity[]> {
  //     return await this.find({
  //       where: { [field]: value } as FindOptionsWhere<TEntity>,
  //     });
  //   }

  //   /**
  //    * Get single entity by field value
  //    */
  //   async getOneByField(
  //     field: keyof TEntity,
  //     value: any,
  //   ): Promise<TEntity | null> {
  //     return await this.findOne({
  //       where: { [field]: value } as FindOptionsWhere<TEntity>,
  //     });
  //   }

  //   /**
  //    * Toggle status field (if exists)
  //    */
  //   async toggleStatus(id: number): Promise<void> {
  //     const entity = await this.getById(id);
  //     if (entity && 'status' in entity) {
  //       const currentStatus = (entity as any).status;
  //       const newStatus = currentStatus === 1 ? 0 : 1;
  //       await this.updateById(id, {
  //         status: newStatus,
  //       } as unknown as DeepPartial<TEntity>);
  //     }
  //   }

  //   /**
  //    * Bulk create entities
  //    */
  //   async bulkCreate(entities: DeepPartial<TEntity>[]): Promise<TEntity[]> {
  //     const createdEntities = this.create(entities);
  //     return await this.save(createdEntities);
  //   }

  //   /**
  //    * Bulk update entities
  //    */
  //   async bulkUpdate(
  //     updates: Array<{ id: number; data: DeepPartial<TEntity> }>,
  //   ): Promise<void> {
  //     for (const update of updates) {
  //       await this.updateById(update.id, update.data);
  //     }
  //   }

  //   /**
  //    * Search entities by text (override in child classes for specific search logic)
  //    */
  //   async search(
  //     searchTerm: string,
  //     searchFields: (keyof TEntity)[] = [],
  //   ): Promise<TEntity[]> {
  //     if (!searchFields.length) {
  //       return [];
  //     }

  //     const query = this.createQueryBuilder(this.entityName);

  //     const whereConditions = searchFields
  //       .map(
  //         (field, index) =>
  //           `${this.entityName}.${String(field)} ILIKE :searchTerm${index}`,
  //       )
  //       .join(' OR ');

  //     if (whereConditions) {
  //       query.where(
  //         `(${whereConditions})`,
  //         searchFields.reduce((params, field, index) => {
  //           params[`searchTerm${index}`] = `%${searchTerm}%`;
  //           return params;
  //         }, {} as any),
  //       );
  //     }

  //     return await query.getMany();
  //   }

  //   /**
  //    * Get entities with pagination without filtering
  //    */
  //   async getPaginated(
  //     page: number = 1,
  //     limit: number = 10,
  //   ): Promise<[TEntity[], number]> {
  //     const query = this.createQueryBuilder(this.entityName);

  //     const offset = (page - 1) * limit;
  //     query.skip(offset).take(limit);

  //     return await query.getManyAndCount();
  //   }

  //   /**
  //    * Get entities count
  //    */
  //   async getTotalCount(): Promise<number> {
  //     return await this.count();
  //   }
}
