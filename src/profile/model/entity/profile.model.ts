import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Post } from './post.model';
import { UserSettings } from './user-settings.model';

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

  @Field({ nullable: true })
  @Prop()
    headline?: string; // Wie LinkedIn-Überschrift

  @Field({ nullable: true })
  @Prop()
  location?: string;

  @Field({ nullable: true })
  @Prop()
  profileImage?: string; // Pfad oder URL

  @Field({ nullable: true })
  @Prop()
    coverImage?: string; // Pfad zum Cover-Bild

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  socialLinks?: string[]; // LinkedIn, Twitter, Instagram etc.

  @Field(() => [ID])
  @Prop()
  followerIds: string[];

  @Field(() => [ID])
  @Prop()
  followedIds: string[];

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  isSuspended: boolean;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, default: null })
  suspendedUntil?: Date; // Optional, falls das Profil vorübergehend gesperrt ist

  @Field()
  @Prop({ type: [Post], default: [] })
  posts: Post[]; // Array von vollständigen Post-Objekten

  @Field()
  @Prop()
  settings: UserSettings; // Verweis auf die Benutzereinstellungen
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);

// versionKey deaktivieren
ProfileSchema.set('versionKey', false);
