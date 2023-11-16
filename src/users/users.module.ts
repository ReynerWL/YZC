import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User_Yzc } from './entities/user.entity';
import { LevelUserModule } from '#/level_user/level_user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User_Yzc]), LevelUserModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
