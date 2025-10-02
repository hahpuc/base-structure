import { ESampleType, EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { Category } from '@modules/category/repository/entities/category.entity';
import { Ward } from '@modules/location/repository/entities/ward.entity';
import { User } from '@modules/user/repository/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Sample extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  slug: string;

  @Column('text')
  @ApiProperty()
  content: string;

  @Column({ nullable: true })
  @ApiProperty()
  image: string;

  @Column({ type: 'datetime', name: 'start_time' })
  @ApiProperty()
  start_time: Date;

  @Column({ type: 'datetime', name: 'end_time' })
  @ApiProperty()
  end_time: Date;

  @Column('tinyint')
  @ApiProperty({ enum: ESampleType })
  type: ESampleType;

  @Column({ nullable: true })
  @ApiProperty()
  color: string;

  @Column('json', { nullable: true })
  @ApiProperty()
  tags: string[];

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  // Relations
  @ManyToOne(() => Ward, { nullable: true })
  @JoinColumn({ name: 'ward_id' })
  @ApiProperty({ type: () => Ward })
  ward: Ward;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  @ApiProperty({ type: () => Category })
  category: Category;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'creator_id' })
  @ApiProperty({ type: () => User })
  creator: User;

  @Column({ type: 'varchar', nullable: true, name: 'creator_id' })
  creator_id: string;
}
