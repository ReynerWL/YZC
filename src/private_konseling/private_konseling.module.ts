import { Module } from '@nestjs/common';
import { PrivateKonselingController } from './private_konseling.controller';
import { PrivateKonselingService } from './private_konseling.service';

@Module({
  controllers: [PrivateKonselingController],
  providers: [PrivateKonselingService]
})
export class PrivateKonselingModule {}
