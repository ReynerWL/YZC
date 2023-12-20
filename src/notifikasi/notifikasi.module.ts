import { Module } from '@nestjs/common';
import { NotifikasiController } from './notifikasi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifikasi } from './entities/notifikasi.entity';
import { NotifikasiService } from './notifikasi.service';
import { UserYzcModule } from '#/user_yzc/user_yzc.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notifikasi]),UserYzcModule],
  controllers: [NotifikasiController],
  providers: [NotifikasiService]
})
export class NotifikasiModule {}
