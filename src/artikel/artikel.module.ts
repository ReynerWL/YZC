import { Module } from '@nestjs/common';
import { ArtikelController } from './artikel.controller';
import { ArtikelService } from './artikel.service';

@Module({
  controllers: [ArtikelController],
  providers: [ArtikelService]
})
export class ArtikelModule {}
