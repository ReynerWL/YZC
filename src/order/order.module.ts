import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderYzc } from './entities/order.entity';
import { SeminarModule } from '#/seminar/seminar.module';
import { CustomerModule } from '#/customer/customer.module';
import { PrivateKonselingModule } from '#/private_konseling/private_konseling.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderYzc]),CustomerModule,PrivateKonselingModule, SeminarModule],
  exports:[OrderService],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderYzcModule {}
