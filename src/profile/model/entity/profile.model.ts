import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { ProfileSettings } from './profile-settings.model.js';
import { ProfileInfo } from './profile-info.entity.js';

@ObjectType()
@Schema({ timestamps: true, collection: 'profiles' })
export class Profile {
  @Field(() => ID)
  get id(): string {
    return (this as any)._id?.toString();
  }

  @Field(() => ID)
  @Prop({ required: true, unique: true })
  userId: string;

  @Field()
  @Prop({ required: true, unique: true })
  username: string;

  @Field(() => ProfileInfo, { nullable: true })
  @Prop({ type: ProfileInfo })
  info?: ProfileInfo;

  @Field(() => ProfileSettings, { nullable: true })
  @Prop({ type: ProfileSettings })
  settings?: ProfileSettings; // Verweis auf die Benutzereinstellungen
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);

// versionKey deaktivieren
ProfileSchema.set('versionKey', false);
