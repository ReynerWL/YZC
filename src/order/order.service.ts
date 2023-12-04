import {  HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderYzc } from './entities/order.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SeminarService } from '#/seminar/seminar.service';
import { CreateOrderYzcDto } from './dto/create-order.dto';
import { CustomerService } from '#/customer/customer.service';
import UpdateOrderYzcDto from './dto/update-order.dto';
import { PrivateKonselingService } from '#/private_konseling/private_konseling.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderYzc)
        private orderYzcRepository: Repository<OrderYzc>,
        private seminarService: SeminarService,
        private customerService: CustomerService,
        private privateKonselingService: PrivateKonselingService
    ){}

    async createOrderSeminar(createOrderYzcDto: CreateOrderYzcDto){
        try {
          const findSeminar = await this.seminarService.findOne(createOrderYzcDto.seminar)
          const findCustomer = await this.customerService.findOne(createOrderYzcDto.customer)
          const orderEntity = new OrderYzc
           orderEntity.customer = findCustomer
           orderEntity.seminar = findSeminar
           orderEntity.transaction_amount = createOrderYzcDto.transaction_amount
           orderEntity.exp_date = createOrderYzcDto.exp_date
           orderEntity.status = createOrderYzcDto.status

           const insertOrderYzc = await this.orderYzcRepository.insert(orderEntity)
           return await this.orderYzcRepository.findOneOrFail({where: {id: insertOrderYzc.identifiers[0].id}})
        } catch (error) {
            return error
        }
    }

    async createOrderPrivateKonseling(createOrderYzcDto: CreateOrderYzcDto){
        try {
          const findPrivateKonseling = await this.privateKonselingService.findOne(createOrderYzcDto.private_konseling)          
          const findCustomer = await this.customerService.findOne(createOrderYzcDto.customer)
          const orderEntity = new OrderYzc
           orderEntity.customer = findCustomer
           orderEntity.private_konseling = findPrivateKonseling
           orderEntity.transaction_amount = createOrderYzcDto.transaction_amount
           orderEntity.exp_date = createOrderYzcDto.exp_date
           orderEntity.status = createOrderYzcDto.status

           const insertOrderYzc = await this.orderYzcRepository.insert(orderEntity)
           return await this.orderYzcRepository.findOneOrFail({where: {id: insertOrderYzc.identifiers[0].id}})
        } catch (error) {
            return error
        }
    }

    findAll(){
        return this.orderYzcRepository.findAndCount({relations: {seminar: true, customer: true}})
    }
    async findOne(id: string){
        try {
            return await this.orderYzcRepository.findOneOrFail({where:{id}, relations: {seminar: true,customer: true}})
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {statusCode: HttpStatus.NOT_FOUND,error: 'Data Not Found'},
                    HttpStatus.NOT_FOUND,
                )
            } else {
                throw error
            }
        }
     }

     async update(id: string, UpdateOrderYzcDto: UpdateOrderYzcDto) {
        try {
          await this.findOne(id)
    
          const orderEntity = new OrderYzc
            orderEntity.transaction_amount = UpdateOrderYzcDto.transaction_amount
            orderEntity.exp_date = UpdateOrderYzcDto.exp_date
            orderEntity.status = UpdateOrderYzcDto.status
    
          await this.orderYzcRepository.update(id,orderEntity)
          return this.orderYzcRepository.findOneOrFail({
            where: {id}
          })
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }
    }
      async deleteOrder(id: string) {
        try {
            await this.findOne(id)
            await this.orderYzcRepository.softDelete(id)
            return `Delete Success`
        } catch (error) {
            throw error
        }
      }
}
