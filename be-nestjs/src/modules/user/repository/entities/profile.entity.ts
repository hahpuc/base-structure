import { BaseDateEntity } from '@common/base/repositories/entities/base-date.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from './user.entity';
@Entity()
export class Profile extends BaseDateEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => User })
  user: User;

  @Column({ nullable: false, primary: true })
  @ApiProperty()
  user_id: string;

  @Column({ nullable: true })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  zalo_id: string;

  @Column({ nullable: true })
  @ApiProperty()
  zalo_follow_oa_id: string;

  @Column({ nullable: true })
  @ApiProperty()
  zalo_follow_at: Date;

  @Column({ nullable: true })
  @ApiProperty()
  full_name: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar: string;

  @Column({ nullable: true })
  code: string;
}
