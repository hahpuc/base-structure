import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class EmailToken extends BaseEntity {
  @Column()
  user_id: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  token_expires_at: Date;

  @Column('datetime', { nullable: true })
  verified_at: Date;

  @Column('tinyint', { default: EStatus.active })
  status: EStatus;
}
