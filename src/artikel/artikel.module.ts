import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artikel } from './entities/artikel.entity';
import { ArtikelController } from './artikel.controller';
import { UserYzcModule } from '#/user_yzc/user_yzc.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artikel]),UserYzcModule],
  exports: [ArtikelService],
  controllers: [ArtikelController],
  providers: [ArtikelService]
})
export class ArtikelModule {}
