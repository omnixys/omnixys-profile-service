import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Profile } from '../model/entity/profile.model.js';
import { UpdateProfileInput } from '../model/dto/update-profile.input.js';
import { ProfileWriteService } from '../service/profile-write.service.js';
import { KeycloakService } from '../../security/keycloak/keycloak.service.js';
import { CreatePostInput } from '../model/dto/create-post.input.js';
import { Post } from '../model/entity/post.model.js';

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

  // Profile Management
  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileInput) {
    return this.#profileService.createProfile(input);
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

  // Posts
  @Mutation(() => Post)
  async createPost(@Args('input') input: CreatePostInput) {
    return this.#profileService.createPost(input);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: UpdatePostInput,
  ) {
    return this.#profileService.updatePost(id, input);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string) {
    return this.#profileService.deletePost(id);
  }

  @Mutation(() => Boolean)
  async archivePost(@Args('id') id: string) {
    return this.#profileService.archivePost(id);
  }

  @Mutation(() => Boolean)
  async unarchivePost(@Args('id') id: string) {
    return this.profileService.unarchivePost(id);
  }

  // Follow/Unfollow
  @Mutation(() => Boolean)
  async followUser(
    @Args('followerId') followerId: string,
    @Args('followedId') followedId: string,
  ) {
    return this.#profileService.followUser(followerId, followedId);
  }

  @Mutation(() => Boolean)
  async unfollowUser(@Args('targetId') targetId: string) {
    return this.#profileService.unfollowUser(targetId);
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
