import { Module } from '@nestjs/common';
import { DetailOrderController } from './detail_order.controller';
import { DetailOrderService } from './detail_order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrder } from './entities/detail_order.entity';
import { PrivateKonselingModule } from '#/private_konseling/private_konseling.module';
import { SeminarModule } from '#/seminar/seminar.module';
import { CustomerModule } from '#/customer/customer.module';
import { TransaksiModule } from '#/transaksi/transaksi.module';
import { PsikologModule } from '#/psikolog/psikolog.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetailOrder]),PrivateKonselingModule,SeminarModule,CustomerModule,PsikologModule],
  controllers: [DetailOrderController],
  providers: [DetailOrderService]
})
export class DetailOrderModule {}
