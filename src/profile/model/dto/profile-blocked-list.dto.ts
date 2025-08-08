import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProfileBlockedListDTO {
  @Field(() => ID)
  blockedId: string;

  @Field()
  blockedUsername: string;

  @Field(() => Date)
  blockedAt: Date;

  @Field({ nullable: true })
  reason?: string;
}
