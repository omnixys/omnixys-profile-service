import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileInfoDTO {
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

  @Field(() => [SocialLinksDTO], { nullable: true })
  socialLinks?: SocialLinksDTO[];

  @Field(() => String, { nullable: true })
  kurzprofil?: string[];

  @Field(() => [AusbildungDTO], { nullable: true })
  ausbildung?: AusbildungDTO[];

  @Field(() => [BerufserfahrungDTO], { nullable: true })
  berufserfahrung?: BerufserfahrungDTO[];

  @Field(() => [String], { nullable: true })
  sprachen?: string[];

  @Field(() => [String], { nullable: true })
  kenntnisse?: string[];
}

@ObjectType()
export class BerufserfahrungDTO {
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

@ObjectType()
export class AusbildungDTO {
  @Field(() => String, { nullable: true })
  abschluss?: string;

  @Field(() => String, { nullable: true })
  in?: string;

  @Field(() => String, { nullable: true })
  wo?: string;
}

@ObjectType()
export class SocialLinksDTO {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}
