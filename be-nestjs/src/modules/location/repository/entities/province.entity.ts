import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Ward } from './ward.entity';

@Entity()
export class Province extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @OneToMany(() => Ward, (ward) => ward.province)
  wards: Ward[];
}
