import { Module } from '@nestjs/common';
import { TransaksiController } from './transaksi.controller';
import { TransaksiService } from './transaksi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { CustomerModule } from '#/customer/customer.module';
import { BankModule } from '#/bank/bank.module';
import { SeminarModule } from '#/seminar/seminar.module';
import { PrivateKonselingModule } from '#/private_konseling/private_konseling.module';
import { DetailOrderModule } from '#/detail_order/detail_order.module';
import { DetailOrder } from '#/detail_order/entities/detail_order.entity';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction,DetailOrder,PrivateKonseling]), CustomerModule,PsikologModule,BankModule,SeminarModule,PrivateKonselingModule,DetailOrderModule],
  exports: [TransaksiService],
  controllers: [TransaksiController],
  providers: [TransaksiService]
})
export class TransaksiModule {}
