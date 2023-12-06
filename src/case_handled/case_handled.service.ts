import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseHandled } from './entities/case_handled.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreateCaseHandledDto } from './dto/create-case_handled.dto';
import { UpdateCaseHandledDto } from './dto/update-case_handled.dto';

@Injectable()
export class CaseHandledService {
    constructor(
        @InjectRepository(CaseHandled)
        private caseHandledRepository: Repository<CaseHandled>,
        private psikologService: PsikologService,
    ){}

    findAll(){
        return this.caseHandledRepository.findAndCount({relations: {psikolog: true}})
    }

    async createCaseHandled(createCaseHandledDto: CreateCaseHandledDto){
       try {
        const findPsikolog = await this.psikologService.findOne(createCaseHandledDto.psikolog)
        const caseEntity = new CaseHandled
        caseEntity.psikolog = findPsikolog
        caseEntity.title = createCaseHandledDto.title
        caseEntity.start_date = createCaseHandledDto.start_date
        caseEntity.end_date = createCaseHandledDto.end_date
        caseEntity.description = createCaseHandledDto.description
        const insertCase = await this.caseHandledRepository.insert(caseEntity)
        return await this.caseHandledRepository.findOneOrFail({where: {id: insertCase.identifiers[0].id}})
           } catch (error) {
        return error
       }
    }

    async findOne(id: string){
        try {
            return await this.caseHandledRepository.findOneOrFail({where:{id}, relations: {psikolog: true}})
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
     
     async update(id: string, updateCaseHandledDto: UpdateCaseHandledDto) {
        try {
          await this.findOne(id)
     
          const caseEntity = new CaseHandled
          caseEntity.title = updateCaseHandledDto.title
          caseEntity.start_date = updateCaseHandledDto.start_date
          caseEntity.end_date = updateCaseHandledDto.end_date
          caseEntity.description = updateCaseHandledDto.description
     
          await this.caseHandledRepository.update(id,caseEntity)
          return this.caseHandledRepository.findOneOrFail({
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
      async deleteCase(id: string) {
        try {
            await this.findOne(id)
            await this.caseHandledRepository.softDelete(id)
            return `Delete Success`
        } catch (error) {
            throw error
        }
      }
     
}
