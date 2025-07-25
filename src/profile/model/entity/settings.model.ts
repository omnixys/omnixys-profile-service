import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type ThemeMode = 'light' | 'dark' | 'system';
export type OmnixysColorScheme =
  | 'original'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue';

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

  @Field({ nullable: true })
  @Prop()
  language?: string;

  @Field({ nullable: true })
  @Prop()
  colorMode?: ThemeMode;

  @Field({ nullable: true })
  @Prop()
  colorScheme?: OmnixysColorScheme;

  @Field({ nullable: true })
  @Prop({ default: true })
  showWelcomeScreen?: boolean;
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);

// versionKey deaktivieren
ProfileSchema.set('versionKey', false);
