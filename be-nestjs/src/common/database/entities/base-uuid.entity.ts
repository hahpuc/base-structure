import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseDateEntity } from './base-date.entity';

@Entity()
export class BaseUUIDEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DeleteDateColumn()
  deleted_at: Date;
}
