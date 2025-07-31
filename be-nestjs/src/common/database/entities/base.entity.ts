import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseDateEntity } from './base-date.entity';

@Entity()
export class BaseEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
}
