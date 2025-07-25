import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  content?: string;

  @Field(() => [String], { nullable: true })
  media?: string[];
}
