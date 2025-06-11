import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './admin/admin.module.js';
import { DevModule } from './config/dev/dev.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware.js';
import { KafkaModule } from './kafka/kafka.module.js';
import { KeycloakModule } from './security/keycloak/keycloak.module.js';
import { graphQlModuleOptions2 } from './config/graphql.js';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from './config/mongo.config.js';
import { ObservabilityModule } from './observability/observability.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    AdminModule,
    HealthModule,
    DevModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(graphQlModuleOptions2),
    MongooseModule.forRoot(database.databaseUri, {
      dbName: database.databaseName,
    }),
    LoggerModule,
    KafkaModule,
    ProfileModule,
    ObservabilityModule,
    KeycloakModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('auth', 'graphql');
  }
}
