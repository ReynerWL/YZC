import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateKonseling } from './entities/private_konseling.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CustomerService } from '#/customer/customer.service';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreatePrivateKonselingDto } from './dto/create-private_konseling.dto';
import { UpdatePrivateKonselingDto } from './dto/update-private_konseling.dto';

@Injectable()
export class PrivateKonselingService {
 constructor(
    @InjectRepository(PrivateKonseling)
    private privateKonselingRepository: Repository<PrivateKonseling>,
    private customerService: CustomerService,
    private psikologService: PsikologService,
 ){}

 findAll(){
    return this,this.privateKonselingRepository.findAndCount({relations: {customer: true, psikolog: true}})
 }

 async createPrivateKonseling(createPrivateKonselingDto: CreatePrivateKonselingDto){
    try {
        const findOneCustomer = await this.customerService.findOne(createPrivateKonselingDto.customer)
        const findOnePsikolog = await this.psikologService.findOne(createPrivateKonselingDto.psikolog)
        let Status: any = 'pending'
        const privateKonselingEntity = new PrivateKonseling
        privateKonselingEntity.customer = findOneCustomer
        privateKonselingEntity.psikolog = findOnePsikolog
        privateKonselingEntity.datetime = createPrivateKonselingDto.datetime
        privateKonselingEntity.price = createPrivateKonselingDto.price
        privateKonselingEntity.status = Status
        
        const insertCostumer = await this.privateKonselingRepository.insert(privateKonselingEntity)
        return await this.privateKonselingRepository.findOneOrFail({where:{id: insertCostumer.identifiers[0].id}})
    } catch (error) {
        return error
    }
}

async findOne(id: string){
    try {
        return await this.privateKonselingRepository.findOneOrFail({where:{id}, relations: {customer: true,psikolog:true}})
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

async update(id: string, updatePrivateKonselingDto: UpdatePrivateKonselingDto) {
    try {
      if (updatePrivateKonselingDto.status === 'pending') {
        
      await this.findOne(id)
      const findOnePsikolog = await this.psikologService.findOne(updatePrivateKonselingDto.psikolog)
      const privateKonselingEntity = new PrivateKonseling
        privateKonselingEntity.datetime = updatePrivateKonselingDto.datetime
        privateKonselingEntity.price = updatePrivateKonselingDto.price
        privateKonselingEntity.status = updatePrivateKonselingDto.status
        privateKonselingEntity.psikolog = findOnePsikolog

      await this.privateKonselingRepository.update(id,privateKonselingEntity)
      return this.privateKonselingRepository.findOneOrFail({
        where: {id}
      })
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
  async deletePrivateKonseling(id: string) {
    try {
        await this.findOne(id)
        await this.privateKonselingRepository.softDelete(id)
        return `Delete Success`
    } catch (error) {
        throw error
    }
  }

  async statusUpdate(id: string, updatePrivateKonselingDto: UpdatePrivateKonselingDto){
    try {
      await this.findOne(id)
      const privateKonselingEntity = new PrivateKonseling
      privateKonselingEntity.status = updatePrivateKonselingDto.status
      await this.privateKonselingRepository.update(id,privateKonselingEntity)
      return this.privateKonselingRepository.findOneOrFail({
        where: {id}
      })
    } catch (error) {
      
    }
  }

  async reject(id: string, updateDto: UpdatePrivateKonselingDto){
    try {
      await this.findOne(id)
  
      const status: any = 'reject'
      const entity = new PrivateKonseling
      entity.status = updateDto.status = status
  
      await this.privateKonselingRepository.update(id,entity)
       return this.privateKonselingRepository.findOneOrFail({
         where: {id}
       })
    } catch (error) {
      throw error
    }
   }
  
   async approve(id: string, updateDto: UpdatePrivateKonselingDto){
    try {
      await this.findOne(id)
  
      const status: any = 'approve'
      const entity = new PrivateKonseling
      entity.status = updateDto.status = status
  
      await this.privateKonselingRepository.update(id,entity)
       return this.privateKonselingRepository.findOneOrFail({
         where: {id}
       })
    } catch (error) {
      throw error
    }
   }
}
