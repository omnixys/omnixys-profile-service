import { InputType, Field } from '@nestjs/graphql';
import { ProfileInfoInput } from '../input/profile-info.input.js';
import { ProfileSettingsInput } from '../input/profil-settings.input.js';

@InputType()
export class UpdateProfileInput {
    @Field(() => String, { nullable: true })
  username: string;

  @Field(() => ProfileInfoInput, { nullable: true })
  info?: ProfileInfoInput;

  @Field(() => ProfileSettingsInput, { nullable: true })
  settings?: ProfileSettingsInput;
}
