import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async getZaloUserById(id: string): Promise<Profile> {
    const query = this.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.user_id = :id AND profile.zalo_id IS NOT NULL', { id });

    query.select([
      'user.status',
      'profile.user_id',
      'profile.full_name',
      'profile.created_at',
      'profile.zalo_id',
      'profile.zalo_follow_oa_id',
      'profile.zalo_follow_at',
      'profile.phone',
    ]);

    return query.getOne();
  }
}
