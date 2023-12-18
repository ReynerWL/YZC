import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { UserYzcModule } from '#/user_yzc/user_yzc.module';

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), UserYzcModule],
    exports: [CustomerService],
    providers: [CustomerService],
    controllers: [CustomerController]
})
export class CustomerModule {}
