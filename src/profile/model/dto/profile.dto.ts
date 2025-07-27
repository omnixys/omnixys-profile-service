import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProfileBlockedList } from '../entity/profile-blocked-list.entity.js';
import { OmnixysColorScheme, ThemeMode } from '../entity/profile-settings.model.js';

@ObjectType()
export class ProfileInfoDTO {
    @Field(() => String, { nullable: true })
    bio?: string;

    @Field(() => String, { nullable: true })
    profileImage?: string;
}

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

@ObjectType()
export class ProfileDTO {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    username: string;

    @Field(() => ProfileInfoDTO, { nullable: true })
    info?: ProfileInfoDTO;

    @Field(() => ProfileSettingsDTO, { nullable: true })
    settings?: ProfileSettingsDTO;
}

@ObjectType()
export class FollowCountDTO {
    @Field(() => Number)
    followers: number;

    @Field(() => Number)
    following: number;
}

@ObjectType()
export class FullProfileDTO {
    @Field(() => ProfileDTO)
    profile: ProfileDTO;

    @Field(() => FollowCountDTO)
    followCount: FollowCountDTO;

    @Field(() => Number)
    friendships: number;
}
