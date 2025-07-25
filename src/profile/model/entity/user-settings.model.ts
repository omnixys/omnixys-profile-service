import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThemeMode = 'light' | 'dark' | 'system';
export type OmnixysColorScheme =
  | 'original'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue';

@ObjectType()
@Schema({ timestamps: true })
export class UserSettings {
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
  colorMode?: ThemeMode;

  @Field({ nullable: true })
  colorScheme?: OmnixysColorScheme;

  @Field({ nullable: true })
  @Prop({ default: true })
  showWelcomeScreen?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
export type UserSettingsDocument = UserSettings & Document;
