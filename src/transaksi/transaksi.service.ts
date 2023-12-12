import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { EntityNotFoundError, Repository, getRepository } from 'typeorm';
import { DetailOrder } from '#/detail_order/entities/detail_order.entity';
import { CustomerService } from '#/customer/customer.service';
import { SeminarService } from '#/seminar/seminar.service';
import { BankService } from '#/bank/bank.service';
import { CreateTransactionDto, CreateTransactionKonselingDto, CreateTransactionPsikologDto } from './dto/create-transaction.dto';
import { PrivateKonselingService } from '#/private_konseling/private_konseling.service';
import { UpdateTransactionDto, UpdateTransactionKonselingDto } from './dto/update-transaction.dto';
import { PsikologService } from '#/psikolog/psikolog.service';
import { DetailOrderService } from '#/detail_order/detail_order.service';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
import { error } from 'console';

@Injectable()
export class TransaksiService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(DetailOrder)
        private detailOrderRepository: Repository<DetailOrder>,
        @InjectRepository(PrivateKonseling)
        private privateKOnselingRepository: Repository<PrivateKonseling>,

        private customerService: CustomerService,
        private psikologService: PsikologService,
        private seminarService: SeminarService,
        private privateKonselingService: PrivateKonselingService,
        private bankService: BankService
    ){}

    findAll(){
        return this.transactionRepository.findAndCount({relations: {customer: true}})
    }

    async createTransaction(createTransactionDto: CreateTransactionDto){
        try {
            let status: any ='pending'
            const findCustomer = await this.customerService.findOne(createTransactionDto.customer)
            const findBank = await this.bankService.findOneUser(createTransactionDto.bank)

          let seminar: Seminar
          const detail = createTransactionDto.detailOrder.map(async (val) =>{ 
            
          if (val.type === 'Seminar') {
            seminar = await this.seminarService.findOne(val.id)
          }else{
            throw error
          }})
           let totals = 0
           if (seminar) {
            totals = seminar.price
           }
            
            const transactionEntity = new Transaction
            transactionEntity.customer = findCustomer
            transactionEntity.bank = findBank
            transactionEntity.exp_date = createTransactionDto.exp_date
            transactionEntity.type =createTransactionDto.type
            transactionEntity.transaction_amount = createTransactionDto.transaction_amount
            transactionEntity.payment_proof = createTransactionDto.payment_proof
            transactionEntity.status = status
            const insertTransaction = await this.transactionRepository.insert(transactionEntity)

            const detailEntity = new DetailOrder
            detailEntity.transaction = insertTransaction.identifiers[0].id
            detailEntity.customer = transactionEntity.customer
            detailEntity.seminar = seminar
            const insertDetail = await this.detailOrderRepository.insert(detailEntity)
            
            return(
              this.transactionRepository.findOneOrFail({where: {id: insertTransaction.identifiers[0].id}}),
              this.detailOrderRepository.findOneOrFail({where: {id: insertDetail.identifiers[0].id}})
              )
            } catch (error) {
              throw error
            }
          }
          
          async createTransactionKonseling(createTransactionKonseling: CreateTransactionKonselingDto){
      try {
        const findCustomer = await this.customerService.findOne(createTransactionKonseling.customer)
        const findPrivateKonseling = createTransactionKonseling.privateKonseling.map((val) =>{return this.privateKonselingService.findOne(val)})
        const result = await Promise.all(findPrivateKonseling)
        const findBank = await this.bankService.findOneUser(createTransactionKonseling.bank)
        
        const transactionEntity = new Transaction
        result.forEach(async element =>{
          transactionEntity.customer = findCustomer
            transactionEntity.bank = findBank
            transactionEntity.transaction_amount = createTransactionKonseling.transaction_amount
            transactionEntity.exp_date = createTransactionKonseling.exp_date
            transactionEntity.type =createTransactionKonseling.type
            transactionEntity.payment_proof = createTransactionKonseling.payment_proof
          })
          const insertTransaction = await this.transactionRepository.insert(transactionEntity)
          
            const detailEntity = new DetailOrder
            detailEntity.transaction = insertTransaction.identifiers[0].id
            detailEntity.customer = transactionEntity.customer
            const insertDetail = await this.detailOrderRepository.insert(detailEntity)
            
            return(
              this.transactionRepository.findOneOrFail({where: {id: insertTransaction.identifiers[0].id}}),
              this.detailOrderRepository.findOneOrFail({where: {id: insertDetail.identifiers[0].id}})
              )
            } catch (error) {
              throw error
            }
          }
          async createTransactionPsikolog(createTransactionPsikologDto: CreateTransactionPsikologDto){
            try {
              let status: any = 'pending'
           const findPsikolog = await this.psikologService.findOne(createTransactionPsikologDto.psikolog)
           const findBank = await this.bankService.findOneUser(createTransactionPsikologDto.bank)
           const psikolog = await this.psikologService.findOne(createTransactionPsikologDto.psikolog)
           
           let seminar: Seminar
           let konseling : PrivateKonseling
           const detail = createTransactionPsikologDto.detailOrder.map(async (val) =>{ 
            
          if (val.type === 'Seminar') {
            seminar = await this.seminarService.findOne(val.id)
          }else if (val.type === "Konseling") {
            konseling = await this.privateKonselingService.findOne(val.id)
          } })
           let totals = 0
           if (seminar) {
            totals = seminar.price
           }if (konseling) {
            totals = konseling.price
           }          
           const transactionEntity = new Transaction
           transactionEntity.psikolog = findPsikolog
           transactionEntity.bank = findBank
           transactionEntity.transaction_amount = totals
           transactionEntity.exp_date = createTransactionPsikologDto.exp_date
           transactionEntity.payment_proof = createTransactionPsikologDto.payment_proof
           transactionEntity.status =  status
           transactionEntity.type = createTransactionPsikologDto.type
           const insertTransaction = await this.transactionRepository.insert(transactionEntity)

           const detailEntity = new DetailOrder
            detailEntity.transaction = insertTransaction.identifiers[0].id
            detailEntity.psikolog = transactionEntity.psikolog
            detailEntity.seminar = seminar
            detailEntity.privateKonseling = konseling
            const insertDetail = await this.detailOrderRepository.insert(detailEntity)
            
            return(
              this.transactionRepository.findOneOrFail({where: {id: insertTransaction.identifiers[0].id}}),
              this.detailOrderRepository.findOneOrFail({where: {id: insertDetail.identifiers[0].id}})
              )
            } catch (error) {
              throw error
            }
          }
          
          async findOne(id: string){
            try {
            return await this.transactionRepository.findOneOrFail({where:{id}, relations: {customer: true}})
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
     
     async findAllByPsikolog(id: string){
       try {
        const psikolog = await this.psikologService.findOne(id)
        return await this.transactionRepository.findAndCount({where: {id: psikolog.id}})
      } catch (error) {
        return error
      }
      }

    async update(id: string, updateTransactionDto: UpdateTransactionDto){
     try {
        if (updateTransactionDto.status === 'reject') {
            await this.findOne(id)
            
            const transactionEntity = new Transaction
            transactionEntity.payment_proof = updateTransactionDto.payment_proof

            await this.transactionRepository.update(id,transactionEntity)
            return this.transactionRepository.findOneOrFail({where:{id}})
        }

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
    async updateKonseling(id: string, updateTransactionDto: UpdateTransactionKonselingDto){
      try {
         if (updateTransactionDto.status === 'reject') {
             await this.findOne(id)
             
             const transactionEntity = new Transaction
             transactionEntity.payment_proof = updateTransactionDto.payment_proof
 
             await this.transactionRepository.update(id,transactionEntity)
             return this.transactionRepository.findOneOrFail({where:{id}})
         }
        }catch (e) {
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

    async deleteTransaction(id: string) {
        try {
            await this.findOne(id)
            await this.transactionRepository.softDelete(id)
            return `Delete Success`
        } catch (error) {
            throw error
        }
      }
    
      async reject(id: string, updateDto: UpdateTransactionDto){
        try {
          await this.findOne(id)
      
          const status: any = 'reject'
          const entity = new Transaction
          entity.alasan = updateDto.alasan
          entity.status = updateDto.status = status
      
          await this.transactionRepository.update(id,entity)
           return this.transactionRepository.findOneOrFail({
             where: {id}
           })
        } catch (error) {
          throw error
        }
       }
      
       async approve(id: string, updateDto: UpdateTransactionDto){
        try {
          await this.findOne(id)
      
          const status: any = 'approve'
          const entity = new Transaction
          entity.status = updateDto.status = status
      
          await this.transactionRepository.update(id,entity)
           return this.transactionRepository.findOneOrFail({
             where: {id}
           })
        } catch (error) {
          throw error
        }
       }

}
