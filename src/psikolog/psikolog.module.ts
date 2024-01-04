import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psikolog } from './entities/psikolog.entity';
import { PsikologService } from './psikolog.service';
import { PsikologController } from './psikolog.controller';
import { UserYzcModule } from '#/user_yzc/user_yzc.module';

@Module({
    imports: [TypeOrmModule.forFeature([Psikolog])],
    exports: [PsikologService],
    providers : [PsikologService],
    controllers : [PsikologController]
})
export class PsikologModule {}
