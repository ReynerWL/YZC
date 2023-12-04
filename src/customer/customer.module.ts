import { UserYzcModule } from '#/user_yzc/user_yzc.module';
import { Module } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), UserYzcModule],
    providers: [CustomerService],
    controllers: [CustomerController]
})
export class CustomerModule {}
