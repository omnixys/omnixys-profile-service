import { forwardRef, Global, Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module.js';
import { ObservabilityModule } from '../observability/observability.module.js';

import { KeycloakModule } from '../security/keycloak/keycloak.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileMutationResolver } from './resolver/profile-mutation.resolver.js';
import { ProfileWriteService } from './service/profile-write.service.js';
import { entities } from './model/entity/entities.entity.js';
import { ProfileQueryResolver } from './resolver/profile-query.resolver.js';
import { ProfileReadService } from './service/profile-read.service.js';

/**
 * Das Modul besteht aus allgemeinen Services, z.B. MailService.
 * @packageDocumentation
 */

/**
 * Die dekorierte Modul-Klasse mit den Service-Klassen.
 */
@Global()
@Module({
  imports: [
    forwardRef(() => KafkaModule),
    ObservabilityModule,
    KeycloakModule,
    MongooseModule.forFeature(entities),
  ],
  providers: [
    ProfileQueryResolver,
    ProfileMutationResolver,
    ProfileReadService,
    ProfileWriteService,
  ],
  exports: [ProfileReadService, ProfileWriteService],
})
export class ProfileModule {}
