import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seminar, Status } from './entities/seminar.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
import { PsikologSeminarService } from '#/psikolog_seminar/psikolog_seminar.service';
import { PsikologSeminar } from '#/psikolog_seminar/entities/psikolog_seminar.entity';
import { UpdatePsikologSeminarDto } from '#/psikolog_seminar/dto/update-psikolog_seminar.dto';

@Injectable()
export class SeminarService {
  constructor(
    @InjectRepository(Seminar)
    private seminarRepository: Repository<Seminar>,
    @InjectRepository(PsikologSeminar)
    private psikologSeminarRepository: Repository<PsikologSeminar>,
    private psikologService: PsikologService,
    private psikologSeminarService: PsikologSeminarService,
  ) {}

  async findAllApprovePsi(id:string) {
    const psikolog = await this.psikologService.findOne(id);
    return this.seminarRepository.findAndCount({
      relations: { psikolog: true, psikologseminar: { psikolog: true } },
      where: { status: Status.Approve ,psikologseminar:{psikolog: {id: psikolog.id},status: Status.Approve}},
    });
  }
  async findAllRejectPsi(id:string) {
    const psikolog = await this.psikologService.findOne(id);
    return this.seminarRepository.findAndCount({
      relations: { psikolog: true, psikologseminar: { psikolog: true } },
      where: { status: Status.Reject ,psikologseminar:{psikolog: {id: psikolog.id}, status: Status.Reject}},
    });
  }
  async findAllPendingPsi(id:string) {
    const psikolog = await this.psikologService.findOne(id);
    return this.seminarRepository.findAndCount({
      relations: { psikolog: true, psikologseminar: { psikolog: true } },
      where: { status: Status.Pending ,psikologseminar:{psikolog: {id: psikolog.id}, status: Status.Pending}},
    });
  }

  findAllApprove() {
    return this.seminarRepository.findAndCount({
      relations: { psikolog: true, psikologseminar: { psikolog: true } },
      where: { status: Status.Approve },
    });
  }
  findAllReject() {
    return this.seminarRepository.findAndCount({
      relations: { psikolog: true, psikologseminar: { psikolog: true } },
      where: { status: Status.Reject },
    });
  }
  findAllPending() {
    return this.seminarRepository.findAndCount({
      relations: { psikolog: true, psikologseminar: { psikolog: true } },
      where: { status: Status.Pending },
    });
  }

  findAll() {
    return this.seminarRepository.findAndCount({
      relations: { psikologseminar: { psikolog: true }, psikolog: true },
    });
  }

  async createSeminar(createSeminarDto: CreateSeminarDto) {
    try {
      const mapping = createSeminarDto.psikolog.map((val) => {
        return this.psikologService.findOne(val);
      });
      const result = await Promise.all(mapping);
      const findPsikolog = createSeminarDto.psikolog.map(async (val) => {
        return await this.psikologService.findOne(val);
      });
      const result2 = await Promise.all(findPsikolog);
      const status: any = 'pending'

      const seminarEntity = new Seminar();
      seminarEntity.psikolog = result2;
      seminarEntity.title = createSeminarDto.title;
      seminarEntity.price = createSeminarDto.price;
      seminarEntity.poster = createSeminarDto.poster;
      seminarEntity.link = createSeminarDto.link;
      seminarEntity.datetime = createSeminarDto.datetime;
      seminarEntity.status = createSeminarDto.status;
      
      const insertSeminar = await this.seminarRepository.insert(seminarEntity);

      result.forEach(async (element) => {
        const psikologSeminarEntity = new PsikologSeminar();
        psikologSeminarEntity.psikolog = element;
        psikologSeminarEntity.seminar = insertSeminar.identifiers[0].id;
        psikologSeminarEntity.status = status
        const insertList = await this.psikologSeminarRepository.insert(
          psikologSeminarEntity,
        );
        seminarEntity.psikologseminar = insertList.identifiers[0].id;
      });

      console.log(result);

      return this.seminarRepository.findOneOrFail({
        where: { id: insertSeminar.identifiers[0].id },
        relations: { psikologseminar: { psikolog: true }, psikolog: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByPsikolog(id: string) {
    try {
      const psikolog = await this.psikologService.findOne(id);
      return await this.seminarRepository.findAndCount({
        where: { id: psikolog.id },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.seminarRepository.findOneOrFail({
        where: { id },
        relations: { psikologseminar: { psikolog: true }, psikolog: true },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, error: 'Data Not Found' },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw error;
      }
    }
  }
  async findOnePsi(id: string, seminars: string) {
    try {
      const psikolog = await this.psikologService.findOne(id)
      const seminar = await this.findOne(seminars)
      return await this.psikologSeminarRepository.findOneOrFail({where: {psikolog: {id: psikolog.id}, seminar: {id: seminar.id}}});
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, error: 'Data Not Found' },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw error;
      }
    }
  }

  async update(id: string, updateSeminarDto: UpdateSeminarDto) {
    try {
      await this.findOne(id);

      const mapping = updateSeminarDto.psikolog.map((val) => {
        return this.psikologService.findOne(val);
      });
      const result = await Promise.all(mapping);

      const seminarEntity = new Seminar();
      seminarEntity.title = updateSeminarDto.title;
      seminarEntity.price = updateSeminarDto.price;
      seminarEntity.poster = updateSeminarDto.poster;
      seminarEntity.link = updateSeminarDto.link;
      seminarEntity.datetime = updateSeminarDto.datetime;
      seminarEntity.status = updateSeminarDto.status;

      result.forEach(async (element) => {
        // await this.deletePsikolog(element.id);

        const psikologSeminarEntity = new PsikologSeminar();
        psikologSeminarEntity.psikolog = element;
        psikologSeminarEntity.seminar = await this.findOne(id);
        await this.psikologSeminarRepository.insert(psikologSeminarEntity);
        return this.psikologSeminarRepository.find({ where: { id } });
      });

      await this.seminarRepository.update(id,seminarEntity)
      return this.seminarRepository.findOneOrFail({
        where: { id },
      });
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
      await this.findOne(id);
      await this.seminarRepository.softDelete(id);
      return `Delete Success`;
    } catch (error) {
      throw error;
    }
  }

  async deletePsikolog(id: string) {
    try {
      console.log('Ini Id yg akan didelete', id);
      await this.psikologSeminarRepository.findOne({
        where: { psikolog: { id } },
      });
      await this.psikologSeminarRepository.delete({ psikolog: { id } });
      return `Delete Success`;
    } catch (error) {
      throw error;
    }
  }

  async reject(id: string,seminar: string, updateDto: UpdateSeminarDto) {
    try {
      await this.findOnePsi(id , seminar);

      const status: any = 'reject';
      const entity = new PsikologSeminar();
      entity.alasan = updateDto.alasan;
      entity.status = status;

      await this.psikologSeminarRepository.update(id, entity);
      return this.seminarRepository.findOneOrFail({
        where: { psikologseminar: {psikolog: {id: id}}  },
      });
    } catch (error) {
      throw error;
    }
  }

  async approve(id: string, seminar: string) {
    try {
      const data = await this.findOnePsi(id, seminar);

      const status: any = 'approve';
      const entity = new PsikologSeminar
      entity.status = status

      await this.psikologSeminarRepository.update(data.id, entity);
      return this.psikologSeminarRepository.findOneOrFail({
        where: {psikolog: {id: id}, seminar: {id: seminar} },
      });
    } catch (error) {
      throw error;
    }
  }

  async approval(id: string){
    try {
      const data = await this.findOne(id)

      if (data.psikologseminar.every((val) => val.status === 'approve' )) {
        const status: any = 'approve'
        const entity = new Seminar()
        entity.status = status
        await this.seminarRepository.update(id,entity)
        return this.seminarRepository.findOneOrFail({
          where: {id}
        })
      }
    } catch (error) {
      throw error
    }
  }

  async rejected(id: string){
    try {
      const data = await this.findOne(id)

      if (data?.psikologseminar.every(val => val.status === 'reject')) {
        const status: any = 'reject'
        const entity = new Seminar()
        entity.status = status
        await this.seminarRepository.update(id,entity)
        return this.seminarRepository.findOneOrFail({
          where: {id}
        })
      }
    } catch (error) {
      throw error
    }
  }
}
