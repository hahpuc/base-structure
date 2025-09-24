import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Language } from './language.entity';
import { TranslationNamespace } from './translation-namespace.entity';

@Entity('translations')
@Index(['namespace_id', 'key', 'language_id'], { unique: true })
@Index(['language_id', 'namespace_id'])
@Index(['key'])
export class Translation extends BaseEntity {
  @Column({ name: 'key', type: 'varchar', length: 255 })
  key: string;

  @Column({ name: 'value', type: 'text' })
  value: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column('tinyint', { default: EStatus.active })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @Column({ name: 'version', default: 1 })
  version: number;

  @ManyToOne(() => TranslationNamespace, (namespace) => namespace.translations)
  @JoinColumn({ name: 'namespace_id' })
  namespace: TranslationNamespace;

  @Column({ name: 'namespace_id' })
  namespace_id: number;

  @ManyToOne(() => Language, (language) => language.translations)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @Column()
  language_id: number;
}
