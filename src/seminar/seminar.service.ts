import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CustomerService } from '#/customer/customer.service';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
import { OrderService } from '#/order/order.service';

@Injectable()
export class SeminarService {
 constructor(
    @InjectRepository(Seminar)
    private seminarRepository: Repository<Seminar>,
    private psikologService: PsikologService,
 ){}

 findAll(){
    return this.seminarRepository.findAndCount({relations: { psikolog: true}})
 }

 async createSeminar(createSeminarDto: CreateSeminarDto){
   try {
      const findPsikolog  = await this.psikologService.findOne(createSeminarDto.psikolog['psikolog'])
      const seminarEntity = new Seminar
      seminarEntity.psikolog['psikolog'] = findPsikolog
      seminarEntity.title = createSeminarDto.title
      seminarEntity.price = createSeminarDto.price
      seminarEntity.poster = createSeminarDto.poster
      seminarEntity.description = createSeminarDto.description
      seminarEntity.datetime = createSeminarDto.datetime
      seminarEntity.status = createSeminarDto.status

      const insertSeminar = await this.seminarRepository.insert(seminarEntity)
      return await this.seminarRepository.findOneOrFail({where: {id: insertSeminar.identifiers[0].id}})
   } catch (error) {
      return error
   }
 }

 async findOne(id: string){
   try {
       return await this.seminarRepository.findOneOrFail({where:{id}, relations: {psikolog: true}})
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

async update(id: string, updateSeminarDto: UpdateSeminarDto) {
   try {
     await this.findOne(id)

      const findPsikolog  = await this.psikologService.findOne(updateSeminarDto.psikolog['psikolog'])
      const seminarEntity = new Seminar
      seminarEntity.psikolog['psikolog'] = findPsikolog
      seminarEntity.title = updateSeminarDto.title
      seminarEntity.price = updateSeminarDto.price
      seminarEntity.poster = updateSeminarDto.poster
      seminarEntity.description = updateSeminarDto.description
      seminarEntity.datetime = updateSeminarDto.datetime
      seminarEntity.status = updateSeminarDto.status

     await this.seminarRepository.update(id,seminarEntity)
     return this.seminarRepository.findOneOrFail({
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
 async deleteSeminar(id: string) {
   try {
       await this.findOne(id)
       await this.seminarRepository.softDelete(id)
       return `Delete Success`
   } catch (error) {
       throw error
   }
 }

 async reject(id: string, updateDto: UpdateSeminarDto){
  try {
    await this.findOne(id)

    const status: any = 'reject'
    const entity = new Seminar
    entity.status = updateDto.status = status

    await this.seminarRepository.update(id,entity)
     return this.seminarRepository.findOneOrFail({
       where: {id}
     })
  } catch (error) {
    throw error
  }
 }

 async approve(id: string, updateDto: UpdateSeminarDto){
  try {
    await this.findOne(id)

    const status: any = 'approve'
    const entity = new Seminar
    entity.status = updateDto.status = status

    await this.seminarRepository.update(id,entity)
     return this.seminarRepository.findOneOrFail({
       where: {id}
     })
  } catch (error) {
    throw error
  }
 }
}
