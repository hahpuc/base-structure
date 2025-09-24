import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Translation } from './translation.entity';

@Entity('translation_namespaces')
export class TranslationNamespace extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100, unique: true })
  @ApiProperty()
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  @ApiProperty()
  description?: string;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @OneToMany(() => Translation, (translation) => translation.namespace)
  translations: Translation[];
}
