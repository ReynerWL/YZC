import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '#/customer/customer.module';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { Artikel } from './entities/artikel.entity';
import { ArtikelController } from './artikel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artikel]),CustomerModule,PsikologModule],
  exports: [ArtikelService],
  controllers: [ArtikelController],
  providers: [ArtikelService]
})
export class ArtikelModule {}
