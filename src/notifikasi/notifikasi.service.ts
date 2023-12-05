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

    async findOne(id: string) {
        try {
            return await this.notifikasiRepository.findOneOrFail({ where: { id }, relations: { customer: true, psikolog: true } })
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    { statusCode: HttpStatus.NOT_FOUND, error: 'Data Not Found' },
                    HttpStatus.NOT_FOUND,
                )
            } else {
                throw error
            }
        }
    }

    async update(id: string, updateNotifikasiDto: UpdateNotifikasiDto) {
        try {
            if (updateNotifikasiDto.statusNotifikasi === 'unread') {

                await this.findOne(id)
                const findOnePsikolog = await this.psikologService.findOne(updateNotifikasiDto.psikolog)
                const notifikasiEntity = new Notifikasi
                notifikasiEntity.notificationContent = updateNotifikasiDto.notificationContent
                notifikasiEntity.statusNotifikasi = updateNotifikasiDto.statusNotifikasi
                notifikasiEntity.psikolog = findOnePsikolog

                await this.notifikasiRepository.update(id, notifikasiEntity)
                return this.notifikasiRepository.findOneOrFail({
                    where: { id }
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

    async deleteNotifikasi(id: string) {
        try {
            await this.findOne(id)
            await this.notifikasiRepository.softDelete(id)
            return `Delete Succes`
        } catch (error) {
            throw error
        }
    }
}
  



