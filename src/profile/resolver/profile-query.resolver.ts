import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Profile } from '../model/entity/profile.model.js';
import { ProfileReadService } from '../service/profile-read.service.js';
import { KeycloakService } from '../../security/keycloak/keycloak.service.js';
import { UUID } from 'crypto';
import { Roles } from 'nest-keycloak-connect';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { HttpExceptionFilter } from '../utils/http-exception.filter.js';

@Resolver(() => Profile)
@UseGuards(KeycloakGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
export class ProfileQueryResolver {
  readonly #profileReadService: ProfileReadService;
  readonly #keycloakService: KeycloakService;

  constructor(
    profileReadService: ProfileReadService,
    keycloakService: KeycloakService,
  ) {
    this.#profileReadService = profileReadService;
    this.#keycloakService = keycloakService;
  }

  @Query(() => Profile)
  @Roles({ roles: ['Admin'] })
  async getProfilByUserId(
    @Args('customerId') customerId: UUID,
  ): Promise<Profile> {
    return this.#profileReadService.findByUserId(customerId);
  }

  @Query(() => Profile)
  async myProfile(@Context() context: any): Promise<Profile> {
    const { username } = await this.#keycloakService.getToken(context);
    return this.#profileReadService.findByUsername(username);
  }
}
