import { Module } from '@nestjs/common';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { PsikologSeminarModule } from '#/psikolog_seminar/psikolog_seminar.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seminar]),PsikologModule, PsikologSeminarModule],
  exports: [SeminarService],
  controllers: [SeminarController],
  providers: [SeminarService]
})
export class SeminarModule {}
