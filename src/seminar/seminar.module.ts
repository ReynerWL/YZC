import { Module } from '@nestjs/common';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { CustomerModule } from '#/customer/customer.module';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { OrderYzcModule } from '#/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seminar]), CustomerModule, PsikologModule],
  exports: [SeminarService],
  controllers: [SeminarController],
  providers: [SeminarService]
})
export class SeminarModule {}
