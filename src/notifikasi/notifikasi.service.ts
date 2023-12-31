import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifikasi, StatusNotifikasi } from './entities/notifikasi.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateNotifikasiDto } from './dto/create.notifikasi.dto';
import { UpdateNotifikasiDto } from './dto/update.notifikasi.dto';
import { UserYzcService } from '#/user_yzc/user_yzc.service';
import { UpdateStatusNotifikasiDto } from './dto/update.status.notifikasi.dto';

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

    async findNotifUnread(inputStatus: string){
        let enumStatus:any

        if(inputStatus == "unread"){
            enumStatus = StatusNotifikasi.UNREAD
        }
        try{
            const result =  await this.notifikasiRepository.find({
                where:{statusNotifikasi: enumStatus}
            })
            console.log(result, "halo")
            return result
        }catch(e){
            throw e
        }
    }

    
    async createNotifikasi(CreateNotifikasiDto: CreateNotifikasiDto) {
        try {
            const pengirim = await this.useryzcService.findOne(CreateNotifikasiDto.pengirim)
            const penerima = await this.useryzcService.findOne(CreateNotifikasiDto.penerima)
            const notifikasiEntity = new Notifikasi()
            notifikasiEntity.pengirim = pengirim
            notifikasiEntity.penerima = penerima
            notifikasiEntity.notificationContent = CreateNotifikasiDto.notificationContent
            const insertNotif = await this.notifikasiRepository.insert(notifikasiEntity)
          
            return await this.notifikasiRepository.findOneOrFail({ where: { id: insertNotif.identifiers[0].id } })
        } catch (error) {
            return error
        }
    }

    async update(id: string, updateNotifikasiDto: UpdateNotifikasiDto) {
        try {
             {

                await this.findNotifById(id)
                const notifikasiEntity = new Notifikasi
                notifikasiEntity.notificationContent = updateNotifikasiDto.notificationContent

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

    async updateStatusNotif(id: string, updateStatusNotifikasiDto: UpdateStatusNotifikasiDto){
        try{
            await this.findNotifById(id)
            const statusNotif = new Notifikasi
            statusNotif.statusNotifikasi = updateStatusNotifikasiDto.statusNotifikasi

            await this.notifikasiRepository.update(id, statusNotif)
            return await this.notifikasiRepository.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }


}