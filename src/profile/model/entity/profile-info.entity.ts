import { ObjectType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class ProfileInfo {
  @Field({ nullable: true })
  @Prop()
  headline?: string;

  @Field({ nullable: true })
  @Prop()
  location?: string;

  @Field({ nullable: true })
  @Prop()
  profileImage?: string;

  @Field({ nullable: true })
  @Prop()
  coverImage?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  socialLinks?: string[];
}
