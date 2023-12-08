import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artikel } from './entities/artikel.entity';
import { Repository } from 'typeorm';
import { CustomerService } from '#/customer/customer.service';
import { PsikologService } from '#/psikolog/psikolog.service';
import { CreateArtikelDto } from './dto/create.artikel.dto';

@Injectable()
export class ArtikelService {
    constructor(
        @InjectRepository(Artikel)
        private artikelRepository: Repository<Artikel>,
        private customerService: CustomerService,
        private psikologService: PsikologService,
    ){}

    findAll() {
        return this.artikelRepository.findAndCount({ relations: {customer: true, psikolog:true }})
    }

    
}
