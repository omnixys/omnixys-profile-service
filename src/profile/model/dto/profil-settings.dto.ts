import { Field, ObjectType } from "@nestjs/graphql";
import { OmnixysColorScheme, ThemeMode } from "../entity/profile-settings.model.js";
import { ProfileBlockedList } from "../entity/profile-blocked-list.entity.js";

@ObjectType()
export class ProfileSettingsDTO {
  @Field(() => Boolean)
  isPrivate: boolean;

  @Field(() => Boolean)
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

  @Field(() => [ProfileBlockedList], { nullable: true })
  blockedUsers?: ProfileBlockedList[];
}
