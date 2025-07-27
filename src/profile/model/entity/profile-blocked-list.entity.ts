import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class ProfileBlockedList {
  @Field(() => ID)
  @Prop({ required: true })
  blockedId: string;

  @Field()
  @Prop({ required: true })
  blockedUsername: string;

  @Field(() => Date)
  @Prop({ default: () => new Date() })
  blockedAt: Date;

  @Field({ nullable: true })
  @Prop()
  reason?: string;
}
