import { Resolver, Args, Query } from '@nestjs/graphql';
import { Friendship } from '../model/entity/friendship.entity.js';
import { FriendshipReadService } from '../service/friendship-read.service.js';

@Resolver(() => Friendship)
export class FriendshipQueryResolver {
  readonly #friendshipService: FriendshipReadService;

  constructor(friendshipReadService: FriendshipReadService) {
    this.#friendshipService = friendshipReadService;
  }

  @Query(() => [Friendship])
  async getFriends(
    @Args('profileId') profileId: string,
  ): Promise<Friendship[]> {
    return this.#friendshipService.getFriends(profileId);
  }
}
