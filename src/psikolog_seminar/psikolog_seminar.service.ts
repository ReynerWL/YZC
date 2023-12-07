import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PsikologSeminar } from './entities/psikolog_seminar.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreatePsikologSeminarDto } from './dto/create-psikolog_seminar.dto';
import { UpdatePsikologSeminarDto } from './dto/update-psikolog_seminar.dto';

@Injectable()
export class PsikologSeminarService {
    constructor(
        @InjectRepository(PsikologSeminar)
        private psikologSeminarRepository: Repository<PsikologSeminar>,
        private psikologService: PsikologService,
        
    ){}

    findAll(){
        return this.psikologSeminarRepository.findAndCount({relations: {psikolog: true, seminar: true}})
    }

    async createPsikologSeminar(createPsikologSeminarDto: CreatePsikologSeminarDto){
        try {
          const findPsikolog = await this.psikologService.findOne(createPsikologSeminarDto.psikolog['psikolog'])
          const entity = new PsikologSeminar
          entity.psikolog['psikolog'] = findPsikolog

          const insertPsikologSeminar = await this.psikologSeminarRepository.insert(entity)
          return await this.psikologSeminarRepository.findOneOrFail({where: {id: insertPsikologSeminar.identifiers[0].id}})
        } catch (error) {
            return error
        }
    }

    async findOne(id: string){
        try {
            return await this.psikologSeminarRepository.findOneOrFail({where:{id}, relations: {psikolog: true, seminar: true}})
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
        const psikolog = await this.psikologService.findOne(id)
        return await this.psikologSeminarRepository.findAndCount({where: {id: psikolog.id}})
      } catch (error) {
        return error
      }
   }
     
     async update(id: string, updatePsikologSeminarDto: UpdatePsikologSeminarDto) {
        try {
          await this.findOne(id)
     
           const findPsikolog  = await this.psikologService.findOne(updatePsikologSeminarDto.psikolog['psikolog'])
           const entity = new PsikologSeminar
           entity.psikolog['psikolog'] = findPsikolog
     
          await this.psikologSeminarRepository.update(id,entity)
          return this.psikologSeminarRepository.findOneOrFail({
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
            await this.psikologSeminarRepository.delete(id)
            return `Delete Success`
        } catch (error) {
            throw error
        }
      }
}
