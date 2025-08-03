import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column('int', { nullable: true })
  order_index: number;
}
