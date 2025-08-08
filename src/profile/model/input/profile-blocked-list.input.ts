import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileBlockedListInput {
  @Field(() => ID)
  blockedId: string;

  @Field()
  blockedUsername: string;

  @Field(() => Date)
  blockedAt: Date;

  @Field({ nullable: true })
  reason?: string;
}
