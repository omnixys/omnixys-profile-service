import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Profile } from '../model/entity/profile.model.js';
import { UpdateProfileInput } from '../model/dto/update-profile.input.js';
import { ProfileWriteService } from '../service/profile-write.service.js';
import { KeycloakService } from '../../security/keycloak/keycloak.service.js';

@Resolver(() => Profile)
export class ProfileMutationResolver {
  readonly #profileService: ProfileWriteService;
  readonly #keycloakService: KeycloakService;

  constructor(
    profileReadService: ProfileWriteService,
    keycloakService: KeycloakService,
  ) {
    this.#profileService = profileReadService;
    this.#keycloakService = keycloakService;
  }

  @Mutation(() => Profile)
  async updateMyProfile(
    @Context() context: any,
    @Args('input') input: UpdateProfileInput,
  ): Promise<Profile> {
    const { username } = await this.#keycloakService.getToken(context);
    return this.#profileService.update(username, input);
  }
}
