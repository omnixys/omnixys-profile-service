import { Field, InputType } from "@nestjs/graphql";
import { OmnixysColorScheme, ThemeMode } from "../entity/profile-settings.model.js";
import { ProfileBlockedListInput } from "./profile-blocked-list.input.js";

@InputType()
export class ProfileSettingsInput {
    @Field(() => Boolean, { nullable: true })
  isPrivate: boolean;

    @Field(() => Boolean, { nullable: true })
  showEmail: boolean;

  @Field({ nullable: true })
  isSuspended?: boolean;

  @Field(() => Date, { nullable: true })
  suspendedUntil?: Date; // Optional, falls das Profil vorübergehend gesperrt ist

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  colorMode?: ThemeMode;

  @Field({ nullable: true })
  colorScheme?: OmnixysColorScheme;

  @Field({ nullable: true })
  showWelcomeScreen?: boolean;

  @Field(() => [ProfileBlockedListInput], { nullable: true })
  blockedUsers?: ProfileBlockedListInput[];
}
