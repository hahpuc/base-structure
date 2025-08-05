import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Province } from './province.entity';

@Entity()
export class Ward extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @ManyToOne(() => Province, (province) => province.wards)
  @JoinColumn({ name: 'province_id' })
  @ApiProperty({ type: () => Province })
  province: Province;

  @Column()
  province_id: number;
}
