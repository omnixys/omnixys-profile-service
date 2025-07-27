import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Follow } from '../model/entity/follow.entity.js';
import { FollowWriteService } from '../service/follow-write.service.js';

@Resolver(() => Follow)
export class FollowMutationResolver {
  readonly #followWriteService: FollowWriteService;

  constructor(followWriteService: FollowWriteService) {
    this.#followWriteService = followWriteService;
  }

  @Mutation(() => Boolean)
  async followUser(
    @Args('followerId') followerId: string,
    @Args('followedId') followedId: string,
  ): Promise<boolean> {
    return this.#followWriteService.followUser(followerId, followedId);
  }

  @Mutation(() => Boolean)
  async unfollowUser(
    @Args('followerId') followerId: string,
    @Args('followedId') followedId: string,
  ): Promise<boolean> {
    return this.#followWriteService.unfollowUser(followerId, followedId);
  }
}
