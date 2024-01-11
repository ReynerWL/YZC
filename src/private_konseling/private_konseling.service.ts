import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateKonseling, StatusPK } from './entities/private_konseling.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CustomerService } from '#/customer/customer.service';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreatePrivateKonselingDto } from './dto/create-private_konseling.dto';
import { UpdatePrivateKonselingDto } from './dto/update-private_konseling.dto';
import { date } from 'joi';

@Injectable()
export class PrivateKonselingService {
 constructor(
    @InjectRepository(PrivateKonseling)
    private privateKonselingRepository: Repository<PrivateKonseling>,
    private customerService: CustomerService,
    private psikologService: PsikologService,
 ){}

 findAll(){
    return this.privateKonselingRepository.findAndCount({relations: {psikolog: true}})
 }

 async findAllPsiPending(id: string){
  const psikolog = await this.psikologService.findOne(id)
  return this.privateKonselingRepository.findAndCount({relations: {psikolog: true,detailOrder:{transaction: true, customer: true}}, where: {psikolog:{id: psikolog.id}, status: StatusPK.Pending}})
}
async findAllPsiApprove(id: string){
  const psikolog = await this.psikologService.findOne(id)
  return this.privateKonselingRepository.findAndCount({relations: {psikolog: true, detailOrder:{transaction: true, customer: true}},where: {psikolog:{id: psikolog.id}, status: StatusPK.Pending}})
}
async findAllPsiReject(id: string){
  const psikolog = await this.psikologService.findOne(id)
  return this.privateKonselingRepository.findAndCount({relations: {psikolog: true,detailOrder:{transaction: true, customer: true}, },where: {psikolog:{id: psikolog.id}, status: StatusPK.Pending}})
}

 async createPrivateKonseling(createPrivateKonselingDto: CreatePrivateKonselingDto){
    try {
        const findOnePsikolog = await this.psikologService.findOne(createPrivateKonselingDto.psikolog)
        let Status: any = 'pending'
        let konseling: PrivateKonseling
        const privateKonselingEntity = new PrivateKonseling
        createPrivateKonselingDto.datetime.map(async(val) =>{
          privateKonselingEntity.psikolog = findOnePsikolog
          privateKonselingEntity.datetime = [val]
          privateKonselingEntity.price = createPrivateKonselingDto.price
          await this.privateKonselingRepository.insert(privateKonselingEntity)
        })
        return await this.privateKonselingRepository.findOne({where:{psikolog:{id: findOnePsikolog.id}},order:{createdAt:'DESC'}})
    } catch (error) {
        return error
    }
}

async findOne(id: string){
    try {
        return await this.privateKonselingRepository.findOneOrFail({where:{id}, relations: {psikolog:true}})
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

async findOnePsi(id: string){
  try {
    const psikolog = await this.psikologService.findOne(id)
      return await this.privateKonselingRepository.find({where:{psikolog: {id: psikolog.id}}, relations: {psikolog:true}})
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
        
      await this.findOne(id)
      const findOnePsikolog = await this.psikologService.findOne(updatePrivateKonselingDto.psikolog)
      const privateKonselingEntity = new PrivateKonseling
      updatePrivateKonselingDto.datetime.map((val) =>{ 
        privateKonselingEntity.datetime = [val]
        privateKonselingEntity.price = updatePrivateKonselingDto.price
        privateKonselingEntity.psikolog = findOnePsikolog
      })
       
      await this.privateKonselingRepository.update(id,privateKonselingEntity)
      return this.privateKonselingRepository.findOneOrFail({
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
  async deletePrivateKonseling(id: string) {
    try {
        await this.findOne(id)
        await this.privateKonselingRepository.softDelete(id)
        return `Delete Success`
    } catch (error) {
        throw error
    }
  }

  async reject(id: string, updateDto: UpdatePrivateKonselingDto){
    try {
      await this.findOne(id)
  
      const status: any = 'reject'
      const entity = new PrivateKonseling
      entity.status = status
      entity.alasan = updateDto.alasan
  
      await this.privateKonselingRepository.update(id,entity)
       return this.privateKonselingRepository.findOneOrFail({
         where: {id}
       })
    } catch (error) {
      throw error
    }
   }
  
   async approve(id: string){
    try {
      await this.findOne(id)
  
      const status: any = 'approve'
      const entity = new PrivateKonseling
      entity.status = status
  
      await this.privateKonselingRepository.update(id,entity)
       return this.privateKonselingRepository.findOneOrFail({
         where: {id}
       })
    } catch (error) {
      throw error
    }
   }
}
