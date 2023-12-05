import { Module } from '@nestjs/common';
import { NotifikasiController } from './notifikasi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifikasi } from './entities/notifikasi.entity';
import { CustomerModule } from '#/customer/customer.module';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { NotifikasiService } from './notifikasi.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notifikasi]),CustomerModule,PsikologModule],
  exports: [NotifikasiService],
  controllers: [NotifikasiController],
  providers: [NotifikasiService]
})
export class NotifikasiModule {}
