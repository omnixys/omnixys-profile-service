import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProfileBlockedList } from './profile-blocked-list.entity.js';

export type ThemeMode = 'light' | 'dark' | 'system';
export type OmnixysColorScheme =
  | 'original'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue';

@ObjectType()
@Schema({ timestamps: true })
export class ProfileSettings {
  @Field({ nullable: true })
  @Prop({ default: false })
  isSuspended?: boolean;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, default: null })
  suspendedUntil?: Date; // Optional, falls das Profil vorübergehend gesperrt ist

  @Field({ nullable: true })
  @Prop()
  language?: string;

  @Field({ nullable: true })
  @Prop({ default: 'system' })
  colorMode?: ThemeMode;

  @Field({ nullable: true })
  @Prop({ default: 'original' })
  colorScheme?: OmnixysColorScheme;

  @Field({ nullable: true })
  @Prop({ default: true })
  showWelcomeScreen?: boolean;

  @Field(() => [ProfileBlockedList], { nullable: true })
  @Prop({ type: [ProfileBlockedList], default: [] })
  blockedUsers?: ProfileBlockedList[];
}

export const ProfileSettingsSchema =
  SchemaFactory.createForClass(ProfileSettings);
export type ProfileSettingsDocument = ProfileSettings & Document;

// versionKey deaktivieren
ProfileSettingsSchema.set('versionKey', false);
