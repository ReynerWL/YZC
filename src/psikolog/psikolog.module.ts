import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psikolog } from './entities/psikolog.entity';
import { PsikologService } from './psikolog.service';
import { PsikologController } from './psikolog.controller';
import { UsersModule } from '#/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Psikolog]), UsersModule],
    providers : [PsikologService],
    controllers : [PsikologController]
})
export class PsikologModule {}
