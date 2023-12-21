import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './health/health.module';
import configuration from './config/configuration';
import * as pino from 'pino';
import { PsikologModule } from './psikolog/psikolog.module';
import { LevelUserModule } from './level_user/level_user.module';
import { UserYzcModule } from './user_yzc/user_yzc.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { SeminarModule } from './seminar/seminar.module';
import { PrivateKonselingModule } from './private_konseling/private_konseling.module';
import { BankModule } from './bank/bank.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { DetailOrderModule } from './detail_order/detail_order.module';
import { ArtikelModule } from './artikel/artikel.module';
import { ReviewModule } from './review/review.module';
import { CaseHandledModule } from './case_handled/case_handled.module';
import { PsikologSeminarModule } from './psikolog_seminar/psikolog_seminar.module';
import { NotifikasiModule } from './notifikasi/notifikasi.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        base: undefined,
        genReqId: (req) => {
          return req['x-correlation-id'];
        },
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers["user-agent"]',
            'req.headers.accept',
            'req.headers["accept-encoding"]',
            'req.headers["accept-language"]',
            'req.headers.host',
            'req.headers.connection',
            'req.headers.cookie',
            'req.headers["sec-ch-ua"]',
            'req.headers["sec-ch-ua-mobile"]',
            'req.headers["sec-ch-ua-platform"]',
            'req.headers["upgrade-insecure-requests"]',
            'req.headers["sec-fetch-site"]',
            'req.headers["sec-fetch-mode"]',
            'req.headers["sec-fetch-user"]',
            'req.headers["sec-fetch-dest"]',
            'req.headers["if-none-match"]',
            'req.headers["cache-control"]',
            'req.query',
            'req.params',
            'req.remoteAddress',
            'req.remotePort',
            'res.headers["access-control-allow-origin"]',
            'res.headers["content-type"]',
            'res.headers["content-length"]',
            'res.headers["etag"]',
          ],
          remove: true,
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_CLIENT: Joi.valid('mysql', 'postgres'),
        DATABASE_HOST: Joi.string(),
        DATABASE_NAME: Joi.string(),
        DATABASE_USERNAME: Joi.string(),
        DATABASE_PASSWORD: Joi.string().empty('').default(''),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'postgres' | 'mysql'>('database.client'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [],
          synchronize: configService.get<string>('env') === 'development',
          autoLoadEntities: true,
          logging: ["query","error"],
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    PsikologModule,
    LevelUserModule,
    UserYzcModule,
    AuthModule,
    CustomerModule,
    SeminarModule,
    PrivateKonselingModule,
    BankModule,
    TransaksiModule,
    DetailOrderModule,
    ArtikelModule,
    ReviewModule,
    CaseHandledModule,
    PsikologSeminarModule,
    NotifikasiModule,
  ],
    
    // SeederModule,
    // UsersModule,
   
    
   
   
  
})
export class AppModule {}
