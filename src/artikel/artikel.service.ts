import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artikel } from './entities/artikel.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateArtikelDto } from './dto/create.artikel.dto';
import { UserYzcService } from '#/user_yzc/user_yzc.service';

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

    async createArtikel (createartikelDto: CreateArtikelDto) {
        try {
            const admin = await this.useryzcService.findOne(createartikelDto.admin)
            const psikolog = await this.useryzcService.findOne(createartikelDto.psikolog)
            const ArtikelEntity = new Artikel()
            ArtikelEntity.admin = admin
            ArtikelEntity.psikolog = psikolog
            ArtikelEntity.title = createartikelDto.title
            ArtikelEntity.articleContent = createartikelDto.articleContent
            ArtikelEntity.imgThumbnail = createartikelDto.imgThumbnail
            const insertArtikel = await this.artikelRepository.insert(ArtikelEntity)

            return await this.artikelRepository.findOne({where:{id: insertArtikel.identifiers[0].id}})
        } catch (error)  {
            return error
        }
    }

}        
