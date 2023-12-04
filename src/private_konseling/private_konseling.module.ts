import { Module } from '@nestjs/common';
import { PrivateKonselingController } from './private_konseling.controller';
import { PrivateKonselingService } from './private_konseling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateKonseling } from './entities/private_konseling.entity';
import { CustomerModule } from '#/customer/customer.module';
import { PsikologModule } from '#/psikolog/psikolog.module';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateKonseling]), CustomerModule,PsikologModule],
  exports: [PrivateKonselingService],
  controllers: [PrivateKonselingController],
  providers: [PrivateKonselingService]
})
export class PrivateKonselingModule {}
