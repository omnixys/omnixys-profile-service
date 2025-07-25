import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  media?: string[]; // Bild-/Videopfad

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  isArchived: boolean;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  profileId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = Post & Document;
