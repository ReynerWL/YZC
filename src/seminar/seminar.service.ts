import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CustomerService } from '#/customer/customer.service';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';

@Injectable()
export class SeminarService {
 constructor(
    @InjectRepository(Seminar)
    private seminarRepository: Repository<Seminar>,
    private customerService: CustomerService,
    private psikologService: PsikologService,
 ){}

 findAll(){
    return this.seminarRepository.findAndCount({relations: {customer: true, psikolog: true}})
 }

 async createSeminar(createSeminarDto: CreateSeminarDto){
   try {
      const findCustomer = await this.customerService.findOne(createSeminarDto.customer)
      const findPsikolog  = await this.psikologService.findOne(createSeminarDto.psikolog['psikolog'])
      const seminarEntity = new Seminar
      seminarEntity.customer = findCustomer
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
       return await this.seminarRepository.findOneOrFail({where:{id}, relations: {customer: true,psikolog: true}})
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

     const findCustomer = await this.customerService.findOne(updateSeminarDto.customer)
      const findPsikolog  = await this.psikologService.findOne(updateSeminarDto.psikolog['psikolog'])
      const seminarEntity = new Seminar
      seminarEntity.customer= findCustomer
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
}
