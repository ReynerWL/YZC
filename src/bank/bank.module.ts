import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { UserYzcModule } from '#/user_yzc/user_yzc.module';
import { PsikologModule } from '#/psikolog/psikolog.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bank]),UserYzcModule, PsikologModule],
  exports: [BankService],
  controllers: [BankController],
  providers: [BankService]
})
export class BankModule {}
