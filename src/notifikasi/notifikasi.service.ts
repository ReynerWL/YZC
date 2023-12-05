import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifikasi } from './entities/notifikasi.entity';
import { EntityMetadataNotFoundError, EntityNotFoundError, Repository } from 'typeorm';
import { CustomerService } from '#/customer/customer.service';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreateNotifikasiDto } from './dto/create.notifikasi.dto';
import { UpdateNotifikasiDto } from './dto/update.notifikasi.dto';

@Injectable()
export class NotifikasiService {
    constructor(
        @InjectRepository(Notifikasi)
        private notifikasiRepository: Repository<Notifikasi>,
        private customerService: CustomerService,
        private psikologService: PsikologService,
    ) { }

    findAll() {
        return this.notifikasiRepository.findAndCount({ relations: { customer: true, psikolog: true } })
    }

    async createNotifikasi(CreateNotifikasiDto: CreateNotifikasiDto) {
        try {
            const findOneCustomer = await this.customerService.findOne(CreateNotifikasiDto.customer)
            const findOnePsikolog = await this.psikologService.findOne(CreateNotifikasiDto.psikolog)
            const notifikasiEntity = new Notifikasi
            notifikasiEntity.customer = findOneCustomer
            notifikasiEntity.psikolog = findOnePsikolog
            notifikasiEntity.notificationContent = CreateNotifikasiDto.notificationContent

            const insertCostumer = await this.notifikasiRepository.insert(notifikasiEntity)
            return await this.notifikasiRepository.findOneOrFail({ where: { id: insertCostumer.identifiers[0].id } })
        } catch (error) {
            return error
        }
    }

   
}
  



