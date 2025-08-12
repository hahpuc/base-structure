import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { Sample } from '@modules/sample/repository/entities/sample.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  slug: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  description: string;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @OneToMany(() => Sample, (sample) => sample.category)
  @ApiProperty({ type: () => Sample, isArray: true })
  samples: Sample[];
}
