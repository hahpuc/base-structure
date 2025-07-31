import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailToken } from './entities/email-token.entity';
import { Token } from './entities/token.entity';
import { EmailTokenRepository } from './repositories/email-token.repository';
import { TokenRepository } from './repositories/token.repository';

@Module({
  providers: [TokenRepository, EmailTokenRepository],
  exports: [TokenRepository, EmailTokenRepository],
  imports: [TypeOrmModule.forFeature([Token, EmailToken])],
})
export class TokenRepositoryModule {}
