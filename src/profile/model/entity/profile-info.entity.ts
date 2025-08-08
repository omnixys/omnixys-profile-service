import { ObjectType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class SocialLinks {
  @Field(() => String, { nullable: true })
  @Prop()
  type?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  link?: string;
}

@ObjectType()
export class Berufserfahrung {
  @Field(() => String, { nullable: true })
  @Prop()
  wo?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  als?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  beschreibung?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  von?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  bis?: string;
}

@ObjectType()
export class Ausbildung {
  @Field(() => String, { nullable: true })
  @Prop()
  abschluss?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  in?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  wo?: string;
}

@ObjectType()
export class ProfileInfo {
    @Field(() => String, { nullable: true })
    @Prop()
    bio?: string;

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

  @Field(() => [SocialLinks], { nullable: true })
  @Prop({ type: [SocialLinks], default: [] })
  socialLinks?: SocialLinks[];

  @Field(() => String, { nullable: true })
  @Prop({ type: String, default: [] })
  kurzprofil?: string;

  @Field(() => [Ausbildung], { nullable: true })
  @Prop({ type: [Ausbildung], default: [] })
  ausbildung?: Ausbildung[];

  @Field(() => [Berufserfahrung], { nullable: true })
  @Prop({ type: [Berufserfahrung], default: [] })
  berufserfahrung?: Berufserfahrung[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  sprachen?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  kenntnisse?: string[];
}
