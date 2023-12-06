import { Module } from '@nestjs/common';
import { PsikologSeminarService } from './psikolog_seminar.service';
import { PsikologSeminarController } from './psikolog_seminar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsikologSeminar } from './entities/psikolog_seminar.entity';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { SeminarModule } from '#/seminar/seminar.module';

@Module({
  imports: [TypeOrmModule.forFeature([PsikologSeminar]), PsikologModule, SeminarModule],
  providers: [PsikologSeminarService],
  controllers: [PsikologSeminarController]
})
export class PsikologSeminarModule {}
