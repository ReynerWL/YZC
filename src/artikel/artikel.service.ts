import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artikel, StatusArtikel } from './entities/artikel.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateArtikelDto } from './dto/create.artikel.dto';
import { UserYzcService } from '#/user_yzc/user_yzc.service';
import { UpdateArtikelDto } from './dto/update.artikel.dto';
import { ApproveRejectArtikelDto } from './dto/approvereject.artikel.dto';

@Injectable()
export class ArtikelService {
    constructor(
        @InjectRepository(Artikel)
        private artikelRepository: Repository<Artikel>,
        private useryzcService : UserYzcService
    ){}

    findAll() {
        return this.artikelRepository.findAndCount()
    }

    async findArtikelById(id: string) {
        try {
            return await this.artikelRepository.findOneOrFail({ 
                where: { id }, 
                relations: { user_yzc: true} 
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

    async findArtikelApprove(inputStatus: string){
        let enumStatus:any

        if(inputStatus == "approve"){
            enumStatus = StatusArtikel.APPROVE
        }
        try{
            const result =  await this.artikelRepository.find({
                where:{statusArtikel:enumStatus}
            })
            return result
        }catch(e){
            throw e
        }
    }

    async findArtikelreject(id: string, approveRejectDto: ApproveRejectArtikelDto){
        try{
            const cariStatus = await this. findArtikelById(id)
            if(cariStatus.statusArtikel === "pending"){
                const cekPrivate = new Artikel
                cekPrivate.statusArtikel = approveRejectDto.statusArtikel
                cekPrivate.alasan = approveRejectDto.alasan_tolak
                await this.artikelRepository.update(id,cekPrivate)
                
                return await this.artikelRepository.findOneOrFail({
                    where:{id}
                })
            }else{
                throw new BadRequestException ("artikel tidak ditemukan")
            }

        }catch(e){
            throw e
        }
    }

    async findListartikelByAutor(id: string) {
        try {
            return await this.artikelRepository.findOneOrFail({ 
                where: { id }, 
                relations: { user_yzc: true} 
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

    async createArtikel (createartikelDto: CreateArtikelDto) {
        try {
            const user_yzc = await this.useryzcService.findOne(createartikelDto.userYzc)
            const ArtikelEntity = new Artikel()
            ArtikelEntity.user_yzc = user_yzc
            ArtikelEntity.title = createartikelDto.title
            ArtikelEntity.articleContent = createartikelDto.articleContent
            ArtikelEntity.imgThumbnail = createartikelDto.imgThumbnail
            const insertArtikel = await this.artikelRepository.insert(ArtikelEntity)

            return await this.artikelRepository.findOne({where:{id: insertArtikel.identifiers[0].id}})
        } catch (error)  {
            return error
        }
    }

    

    async updateArtikel(id: string, updateArtikelDto: UpdateArtikelDto) {
        try {
             {

                await this.findArtikelById(id)
                const ArtikelEntity = new Artikel
                ArtikelEntity.title = updateArtikelDto.title
                ArtikelEntity.articleContent = updateArtikelDto.articleContent
                ArtikelEntity.imgThumbnail = updateArtikelDto.imgThumbnail

                await this.artikelRepository.update(id, ArtikelEntity)
                return this.artikelRepository.findOneOrFail({
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

    
    async approveRejectArtikel(id: string, updateStatusArtikelikasiDto: ApproveRejectArtikelDto){
        try{
            await this.findArtikelById(id)
            const statusArtikel = new Artikel
            statusArtikel.statusArtikel = updateStatusArtikelikasiDto.statusArtikel

            await this.artikelRepository.update(id, statusArtikel)
            return await this.artikelRepository.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }
    
    async softDeletedById(id: string) {
        try {
            // cari dulu id valid ga
            await this.findArtikelById(id)

            //kalau nemu langsung delete
            await this.artikelRepository.softDelete(id)

            return "succes"
        } catch (e) {
            throw e
        }
    }
}        
