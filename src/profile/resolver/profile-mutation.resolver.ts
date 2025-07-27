import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Profile } from '../model/entity/profile.entity.js';
import { UpdateProfileInput } from '../model/dto/update-profile.input.js';
import { ProfileWriteService } from '../service/profile-write.service.js';
import { KeycloakService } from '../../security/keycloak/keycloak.service.js';
import { CreateProfileInput } from '../model/dto/create-profile.input.js';

@Resolver(() => Profile)
export class ProfileMutationResolver {
  readonly #profileService: ProfileWriteService;
  readonly #keycloakService: KeycloakService;

  constructor(
    profileWriteService: ProfileWriteService,
    keycloakService: KeycloakService,
  ) {
    this.#profileService = profileWriteService;
    this.#keycloakService = keycloakService;
  }

  // Profile Management
  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileInput) {
    return this.#profileService.create(input);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Context() context: any,
    @Args('input') input: UpdateProfileInput,
  ): Promise<Profile> {
    const { username } = await this.#keycloakService.getToken(context);
    return this.#profileService.update(username, input);
  }

  @Mutation(() => Boolean)
  async deleteProfile(@Args('id') id: string) {
    return this.#profileService.deleteProfile(id);
  }

  @Mutation(() => Boolean)
  async suspendProfile(@Args('id') id: string) {
    return this.#profileService.suspendProfile(id);
  }

  // Blocking & Reporting
  @Mutation(() => Boolean)
  async blockUser(@Args('blockedId') blockedId: string) {
    return this.#profileService.blockUser(blockedId);
  }

  @Mutation(() => Boolean)
  async unblockUser(@Args('blockedId') blockedId: string) {
    return this.#profileService.unblockUser(blockedId);
  }

  @Mutation(() => Boolean)
  async reportUser(
    @Args('reportedId') reportedId: string,
    @Args('reason') reason: string,
  ) {
    return this.#profileService.reportUser(reportedId, reason);
  }
}
