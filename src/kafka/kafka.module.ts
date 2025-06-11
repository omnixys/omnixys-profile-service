// Pfad: src/kafka/kafka.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaEventDispatcherService } from './kafka-event-dispatcher.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
import { KafkaHeaderBuilder } from './kafka-header-builder.js';
import { ObservabilityModule } from '../observability/observability.module.js';
import { ShutdownHandler } from './handlers/shutdown.handler.js';
import { ProfileModule } from '../profile/profile.module.js';

@Module({
  imports: [
    DiscoveryModule,
    forwardRef(() => ProfileModule),
    forwardRef(() => ObservabilityModule),
  ],
  providers: [
    KafkaProducerService,
    KafkaConsumerService,
    KafkaEventDispatcherService,
    KafkaHeaderBuilder,

    // Kafka-Handler
    ShutdownHandler,
    // AccountCreatedHandler,
    // AccountDeletedHandler,
    // ShoppingCartCreatedHandler,
    // ShoppingCartDeletedHandler,
  ],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
