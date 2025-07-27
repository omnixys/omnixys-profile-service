import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SendFriendRequestInput {
  @Field(() => ID)
  recipientId: string;
}

@InputType()
export class RespondFriendRequestInput {
  @Field(() => ID)
  friendshipId: string;
}
