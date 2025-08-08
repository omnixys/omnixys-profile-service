import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProfileInfoDTO } from './profile-info.dto.js';
import { ProfileSettingsDTO } from './profil-settings.dto.js';


@ObjectType()
export class ProfileDTO {
  @Field(() => ID)
  id: string;

    @Field(() => ID)
      userId: string;

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
