import { Module } from '@nestjs/common';
import { DetailOrderController } from './detail_order.controller';
import { DetailOrderService } from './detail_order.service';

@Module({
  controllers: [DetailOrderController],
  providers: [DetailOrderService]
})
export class DetailOrderModule {}
