import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileInfoInput {
  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  headline?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  coverImage?: string;

  @Field(() => [SocialLinksInput], { nullable: true })
  socialLinks?: SocialLinksInput[];

  @Field(() => String, { nullable: true })
  kurzprofil?: string;

  @Field(() => [AusbildungInput], { nullable: true })
  ausbildung?: AusbildungInput[];

  @Field(() => [BerufserfahrungInput], { nullable: true })
  berufserfahrung?: BerufserfahrungInput[];

  @Field(() => [String], { nullable: true })
  sprachen?: string[];

  @Field(() => [String], { nullable: true })
  kenntnisse?: string[];
}

@InputType()
export class BerufserfahrungInput {
  @Field(() => String, { nullable: true })
  wo?: string;

  @Field(() => String, { nullable: true })
  als?: string;

  @Field(() => String, { nullable: true })
  beschreibung?: string;

  @Field(() => String, { nullable: true })
  von?: string;

  @Field(() => String, { nullable: true })
  bis?: string;
}

@InputType()
export class AusbildungInput {
  @Field(() => String, { nullable: true })
  abschluss?: string;

  @Field(() => String, { nullable: true })
  in?: string;

  @Field(() => String, { nullable: true })
  wo?: string;
}

@InputType()
export class SocialLinksInput {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}
