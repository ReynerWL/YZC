import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifikasi, StatusNotifikasi } from './entities/notifikasi.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateNotifikasiDto } from './dto/create.notifikasi.dto';
import { UpdateNotifikasiDto } from './dto/update.notifikasi.dto';
import { UserYzcService } from '#/user_yzc/user_yzc.service';

@Injectable()
export class NotifikasiService {
    constructor(
        @InjectRepository(Notifikasi)
        private notifikasiRepository: Repository<Notifikasi>,
        private useryzcService : UserYzcService
    ) { }

    findAll() {
        return this.notifikasiRepository.findAndCount()
    }

    async findNotifById(id: string) {
        try {
            return await this.notifikasiRepository.findOneOrFail({ 
                where: { id }, 
                relations: { pengirim: true, penerima: true } 
            })
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
    
    async createNotifikasi(CreateNotifikasiDto: CreateNotifikasiDto) {
        try {
            console.log("sebelum")
            const pengirim = await this.useryzcService.findOne(CreateNotifikasiDto.pengirim)
            console.log( "pengirim ga ada")
            const penerima = await this.useryzcService.findOne(CreateNotifikasiDto.penerima)
            console.log("penerima ga ada")
            const notifikasiEntity = new Notifikasi()
            notifikasiEntity.pengirim = pengirim
            notifikasiEntity.penerima = penerima
            notifikasiEntity.notificationContent = CreateNotifikasiDto.notificationContent
            console.log("apa aja")
            const insertNotif = await this.notifikasiRepository.insert(notifikasiEntity)
            console.log("apaan tuh")
            return await this.notifikasiRepository.findOneOrFail({ where: { id: insertNotif.identifiers[0].id } })
        } catch (error) {
            return error
        }
    }

    

}
  



