import { InputType, Field } from '@nestjs/graphql';
import {
  OmnixysColorScheme,
  ThemeMode,
} from '../entity/profile-settings.model.js';

@InputType()
export class UpdateProfileInput {
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

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  colorMode?: ThemeMode;

  @Field({ nullable: true })
  colorScheme?: OmnixysColorScheme;

  @Field({ nullable: true })
  showWelcomeScreen?: boolean;

  @Field(() => [String], { nullable: true })
  dashboardWidgets?: string[];
}
