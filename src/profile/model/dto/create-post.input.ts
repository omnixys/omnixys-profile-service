import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  media?: string[];
}
