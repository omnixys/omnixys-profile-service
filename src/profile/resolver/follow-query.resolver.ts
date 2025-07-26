import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Follow } from '../model/entity/follow.model.js';
import { FollowReadService } from '../service/follow-read.service.js';

@Resolver(() => Follow)
export class FollowQueryResolver {
  readonly #followReadService: FollowReadService;

  constructor(followReadService: FollowReadService) {
    this.#followReadService = followReadService;
  }

  /**
   * Liste aller Follower für ein Profil
   */
  @Query(() => [Follow])
  async getFollowers(
    @Args('profileId') profileId: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<Follow[]> {
    return this.#followReadService.getFollowers(profileId, limit);
  }

  /**
   * Liste aller Personen, denen ein Profil folgt
   */
  @Query(() => [Follow])
  async getFollowing(
    @Args('profileId') profileId: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<Follow[]> {
    return this.#followReadService.getFollowing(profileId, limit);
  }

  /**
   * Anzahl der Follower
   */
  @Query(() => Int)
  async getFollowerCount(
    @Args('profileId') profileId: string,
  ): Promise<number> {
    return this.#followReadService.getFollowerCount(profileId);
  }

  /**
   * Anzahl der Following
   */
  @Query(() => Int)
  async getFollowingCount(
    @Args('profileId') profileId: string,
  ): Promise<number> {
    return this.#followReadService.getFollowingCount(profileId);
  }
}
