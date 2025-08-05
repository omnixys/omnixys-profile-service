import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Profile } from '../model/entity/profile.entity.js';
import { ProfileReadService } from '../service/profile-read.service.js';
import { KeycloakService } from '../../security/keycloak/keycloak.service.js';
import { UUID } from 'crypto';
import { Public } from 'nest-keycloak-connect';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { HttpExceptionFilter } from '../utils/http-exception.filter.js';
import { LoggerService } from '../../observability/logger.service.js';
import { LoggerPlus } from '../../observability/logger-plus.js';
import { FullProfileDTO, ProfileDTO } from '../model/dto/profile.dto.js';

export interface FullProfile {
    profile: Profile;
    followCount: {
        followers: number,
        following: number,
    },
    friendships: number;
}

@Resolver(() => Profile)
@UseGuards(KeycloakGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
export class ProfileQueryResolver {
    readonly #profileReadService: ProfileReadService;
    readonly #keycloakService: KeycloakService;

    readonly #loggerService: LoggerService;
    readonly #logger: LoggerPlus;

    constructor(
        profileReadService: ProfileReadService,
        keycloakService: KeycloakService,

        loggerService: LoggerService,
    ) {
        this.#profileReadService = profileReadService;
        this.#keycloakService = keycloakService;

        this.#loggerService = loggerService;
        this.#logger = this.#loggerService.getLogger(ProfileQueryResolver.name);
    }

    @Query(() => ProfileDTO)
    async myProfile(@Context() context: any): Promise<Profile> {
        this.#logger.debug('Fetching my profile');
        const { username } = await this.#keycloakService.getToken(context);
        return this.#profileReadService.findByUsername(username);
    }

    @Query(() => FullProfileDTO)
    async myFullProfile(@Context() context: any): Promise<FullProfile> {
        const { username } = await this.#keycloakService.getToken(context);
        this.#logger.debug('myFullProfile: username: %s', username);

        const profile = await this.#profileReadService.getMyFullProfile(username);
        this.#logger.debug('myFullProfile: profile: %o', profile);
        return profile;
    }

    /**
     * Hole ein Profil basierend auf dem Benutzernamen.
     */
    @Query(() => ProfileDTO)
    @Public()
    async getProfilByUserId(
        @Args('customerId') customerId: UUID,
    ): Promise<Profile> {
        return this.#profileReadService.findByUserId(customerId);
    }

    @Query(() => FullProfileDTO)
    @Public()
    async getFullProfileByUserId(
        @Args('customerId') customerId: UUID,
    ): Promise<FullProfile> {
        this.#logger.debug('getFullProfilByUserId: customerId: %s', customerId);
        const profile = await this.#profileReadService.getFullProfile(customerId);
        this.#logger.debug('getFullProfilByUserId: profile: %o', profile);
        return profile;
    }

    /**
     * Liste alle Profile (für Suchfunktionen).
     * Optional: Paginierung und Filter können später hinzugefügt werden.
     */
    @Public()
    @Query(() => [ProfileDTO])
    async getProfiles(): Promise<Profile[]> {
        return this.#profileReadService.findAllProfiles();
    }
}
