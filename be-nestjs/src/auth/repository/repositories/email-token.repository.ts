import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EmailToken } from '../entities/email-token.entity';

@Injectable()
export class EmailTokenRepository extends Repository<EmailToken> {
  constructor(dataSource: DataSource) {
    super(EmailToken, dataSource.createEntityManager());
  }
}
