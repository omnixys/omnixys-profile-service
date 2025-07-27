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
import { FollowWriteService } from './service/follow-write.service.js';
import { FollowReadService } from './service/follow-read.service.js';
import { PostReadService } from './service/post-read.service.js';
import { PostWriteService } from './service/post-write.service.js';
import { FollowMutationResolver } from './resolver/follow-mutation.resolver.js';
import { FollowQueryResolver } from './resolver/follow-query.resolver.js';
import { PostQueryResolver } from './resolver/post-query.resolver.js';
import { PostMutationResolver } from './resolver/post-mutation.resolver.js';
import { FriendshipMutationResolver } from './resolver/friendship-mutation.resolver.js';
import { FriendshipQueryResolver } from './resolver/friendship-query.resolver.js';
import { FriendshipReadService } from './service/friendship-read.service.js';
import { FriendshipWriteService } from './service/friendship-write.service.js';

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
    FollowMutationResolver,
    FollowQueryResolver,
    PostQueryResolver,
    PostMutationResolver,
    ProfileReadService,
    ProfileWriteService,
    FollowWriteService,
    FollowReadService,
    PostReadService,
    PostWriteService,
    FriendshipMutationResolver,
    FriendshipReadService,
    FriendshipWriteService,
    FriendshipQueryResolver,
  ],
  exports: [
    ProfileReadService,
    ProfileWriteService,
    FollowWriteService,
    FollowReadService,
    PostReadService,
    PostWriteService,
    FriendshipMutationResolver,
    FriendshipReadService,
    FriendshipWriteService,
  ],
})
export class ProfileModule {}
