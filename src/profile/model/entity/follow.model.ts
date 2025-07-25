import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Follow {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  followerId: string;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  followedId: string;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
export type FollowDocument = Follow & Document;
