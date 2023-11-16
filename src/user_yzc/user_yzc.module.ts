import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserYzcService } from './user_yzc.service';
import { UserYzcController } from './user_yzc.controller';
import { User_Yzc } from './entities/user_yzc.entity';
import { LevelUserModule } from '#/level_user/level_user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User_Yzc]), LevelUserModule],
  controllers: [UserYzcController],
  providers: [UserYzcService],
})
export class UserYzcModule {}
