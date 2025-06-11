import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health.controller.js';
import { KafkaIndicator } from './kafka.indicator.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.health.env',
      isGlobal: true,
    }),
    TerminusModule,
    MongooseModule,
  ],
  controllers: [HealthController],
  providers: [KafkaIndicator],
})
export class HealthModule {}
