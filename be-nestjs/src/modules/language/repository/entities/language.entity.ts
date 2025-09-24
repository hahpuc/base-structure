import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

import { Translation } from './translation.entity';

@Entity('languages')
export class Language extends BaseEntity {
  @Column({ type: 'varchar', length: 10, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  native_name: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  flag_code?: string;

  @Column({
    nullable: true,
  })
  flag_icon?: string;

  @Column({ type: 'boolean', default: false })
  is_rtl: boolean;

  @Column('tinyint', { default: EStatus.active })
  status: EStatus;

  @OneToMany(() => Translation, (translation) => translation.language)
  translations: Translation[];
}
