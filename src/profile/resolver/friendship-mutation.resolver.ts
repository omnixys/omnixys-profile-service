import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  SendFriendRequestInput,
  RespondFriendRequestInput,
} from '../model/dto/friendship.input.js';
import { Friendship } from '../model/entity/friendship.entity.js';
import { FriendshipWriteService } from '../service/friendship-write.service.js';

@Resolver(() => Friendship)
export class FriendshipMutationResolver {
  readonly #friendshipService: FriendshipWriteService;

  constructor(friendshipReadService: FriendshipWriteService) {
    this.#friendshipService = friendshipReadService;
  }

  @Mutation(() => Friendship)
  async sendFriendRequest(
    @Args('input') input: SendFriendRequestInput,
    @Args('requesterId') requesterId: string,
  ): Promise<Friendship> {
    return this.#friendshipService.sendRequest(requesterId, input.recipientId);
  }

  @Mutation(() => Friendship)
  async acceptFriendRequest(
    @Args('input') input: RespondFriendRequestInput,
  ): Promise<Friendship> {
    return this.#friendshipService.acceptRequest(input.friendshipId);
  }

  @Mutation(() => Friendship)
  async declineFriendRequest(
    @Args('input') input: RespondFriendRequestInput,
  ): Promise<Friendship> {
    return this.#friendshipService.declineRequest(input.friendshipId);
  }

  @Mutation(() => Boolean)
  async removeFriendship(
    @Args('friendshipId') friendshipId: string,
  ): Promise<boolean> {
    return this.#friendshipService.removeFriendship(friendshipId);
  }
}
