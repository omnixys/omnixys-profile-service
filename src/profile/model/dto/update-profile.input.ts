import { InputType, Field } from '@nestjs/graphql';
import { OmnixysColorScheme, ThemeMode } from '../entity/profile.model';

@InputType()
export class UpdateProfileInput {
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
