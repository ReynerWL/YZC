import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import { JwtStrategy } from './jwt.strategies.service';
import { LevelUserModule } from '#/level_user/level_user.module';
import { CustomerModule } from '#/customer/customer.module';
import { PsikologModule } from '#/psikolog/psikolog.module';
import { Customer } from '#/customer/entities/customer.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'YzcSecretKey',
      signOptions: {expiresIn: '24h'},
    }),
    TypeOrmModule.forFeature([User_Yzc,Customer,Psikolog]), LevelUserModule,CustomerModule,PsikologModule
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
