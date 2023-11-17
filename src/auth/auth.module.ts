import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import { JwtStrategy } from './jwt.strategies.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'YzcSecretKey',
      signOptions: {expiresIn: '24h'},
    }),
    TypeOrmModule.forFeature([User_Yzc])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
