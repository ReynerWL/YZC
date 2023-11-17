import { Module } from '@nestjs/common';
import { LevelUserController } from './level_user.controller';
import { LevelUserService } from './level_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level_User } from './entities/level_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level_User])],
  exports: [LevelUserService],
  controllers: [LevelUserController],
  providers: [LevelUserService]
})
export class LevelUserModule {}
