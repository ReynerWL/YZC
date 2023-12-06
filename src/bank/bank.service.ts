import { PsikologService } from '#/psikolog/psikolog.service';
import { UserYzcService } from '#/user_yzc/user_yzc.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
    constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    private psikologService: PsikologService,
    private userYzcService: UserYzcService
    ){}

 findAll(){
    return this.bankRepository.findAndCount({relations: {psikolog: true, userYzc: true}})
 }

 async createBankUser(createBankDto: CreateBankDto){
    try {
    const findUser = await this.userYzcService.findOne(createBankDto.userYzc)
    const entity = new Bank 
    entity.userYzc = findUser
    entity.bank_name = createBankDto.bank_name
    entity.account_owner_name = createBankDto.account_owner_name
    entity.qr = createBankDto.qr

    const insertEntity = await this.bankRepository.insert(entity)
    return await this.bankRepository.findOneOrFail({where: {id: insertEntity.identifiers[0].id}})
   } catch (error) {
        return error
    }
 }

 async createBankPsikolog(createBankDto: CreateBankDto){
   try {
   const findPsikolog = await this.psikologService.findOne(createBankDto.psikolog)
   const entity = new Bank 
   entity.psikolog = findPsikolog
   entity.bank_name = createBankDto.bank_name
   entity.account_owner_name = createBankDto.account_owner_name
   entity.qr = createBankDto.qr

   const insertEntity = await this.bankRepository.insert(entity)
   return await this.bankRepository.findOneOrFail({where: {id: insertEntity.identifiers[0].id}})
  } catch (error) {
       return error
   }
}

async findOneUser(id: string){
   try {
       return await this.bankRepository.findOneOrFail({where:{id}, relations: {psikolog: true}})
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

async findOnePsikolog(id: string){
   try {
       return await this.bankRepository.findOneOrFail({where:{id}, relations: {userYzc: true}})
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

async updateBankPsikolog(id: string, updateBankDto: UpdateBankDto) {
   try {
     await this.findOnePsikolog(id)
      const entity = new Bank
      entity.bank_name = updateBankDto.bank_name
      entity.account_owner_name = updateBankDto.account_owner_name
      entity.qr = updateBankDto.qr

     await this.bankRepository.update(id,entity)
     return this.bankRepository.findOneOrFail({
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

async updateBankUser(id: string, updateBankDto: UpdateBankDto) {
   try {
     await this.findOneUser(id)

      const entity = new Bank
      entity.bank_name = updateBankDto.bank_name
      entity.account_owner_name = updateBankDto.account_owner_name
      entity.qr = updateBankDto.qr

     await this.bankRepository.update(id,entity)
     return this.bankRepository.findOneOrFail({
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
 async deleteBankUser(id: string) {
   try {
       await this.findOneUser(id)
       await this.bankRepository.softDelete(id)
       return `Delete Success`
   } catch (error) {
       throw error
   }
 }

 async deleteBankPsikolog(id: string) {
   try {
       await this.findOnePsikolog(id)
       await this.bankRepository.softDelete(id)
       return `Delete Success`
   } catch (error) {
       throw error
   }
 }
}
