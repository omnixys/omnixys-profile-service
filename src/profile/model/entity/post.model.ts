import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true, collection: 'posts' })
export class Post {
  @Field(() => ID)
  get id(): string {
    return (this as any)._id?.toString();
  }

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  media?: string[];

  @Field(() => Boolean)
  @Prop({ default: false })
  isArchived: boolean;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  profileId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
