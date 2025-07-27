import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  headline?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  coverImage?: string;

  @Field(() => [String], { nullable: true })
  socialLinks?: string[];
}
