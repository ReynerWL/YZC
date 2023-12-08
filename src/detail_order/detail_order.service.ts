import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailOrder } from './entities/detail_order.entity';
import { Repository } from 'typeorm';
import { PrivateKonselingService } from '#/private_konseling/private_konseling.service';
import { SeminarService } from '#/seminar/seminar.service';
import { TransaksiService } from '#/transaksi/transaksi.service';
import { CustomerService } from '#/customer/customer.service';

@Injectable()
export class DetailOrderService {
    constructor(
        @InjectRepository(DetailOrder)
        private detailOrderRepository: Repository<DetailOrder>,
        private privateKonselingService: PrivateKonselingService,
        private seminarService: SeminarService,
        private transactionService: TransaksiService,
        private customerService: CustomerService
    ){}

    findAll(){
        return this.detailOrderRepository.findAndCount({relations: {transaction: true,customer: true,seminar: true,privateKonseling:true}}) 
    }

    async findOne(id: string){
        try {
            return await this.detailOrderRepository.findOneOrFail({where:{id},relations: {transaction: true, customer: true,seminar:true,privateKonseling:true}})
        } catch (error) {
            throw error
        }
    }

    async deleteOrder(id: string){
        try {
            await this.findOne(id)
            await this.detailOrderRepository.softDelete(id)
            return `Delete Success`
        } catch (error) {
            
        }
    }
}
