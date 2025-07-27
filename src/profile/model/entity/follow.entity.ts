import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true, collection: 'follows' })
export class Follow {
  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  followerId: string;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  followedId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export type FollowDocument = Follow & Document;
export const FollowSchema = SchemaFactory.createForClass(Follow);

FollowSchema.index({ followerId: 1, followedId: 1 }, { unique: true });
