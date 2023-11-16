import { Module } from '@nestjs/common';
import { LevelUserController } from './level_user.controller';
import { LevelUserService } from './level_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '#/users/users.module';
import { Level_User } from './entities/level_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level_User]), UsersModule],
  controllers: [LevelUserController],
  providers: [LevelUserService]
})
export class LevelUserModule {}
