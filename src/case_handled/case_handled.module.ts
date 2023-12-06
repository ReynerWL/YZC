import { Module } from '@nestjs/common';
import { CaseHandledService } from './case_handled.service';
import { CaseHandledController } from './case_handled.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseHandled } from './entities/case_handled.entity';
import { PsikologModule } from '#/psikolog/psikolog.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseHandled]),PsikologModule],
  providers: [CaseHandledService],
  controllers: [CaseHandledController]
})
export class CaseHandledModule {}
