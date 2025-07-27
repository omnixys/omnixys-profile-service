import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

@ObjectType()
@Schema({ timestamps: true, collection: 'friendships' })
export class Friendship {
  @Field(() => ID)
  get id(): string {
    return (this as any)._id?.toString();
  }

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  requesterId: string; // Derjenige, der die Anfrage sendet

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  recipientId: string; // Derjenige, der die Anfrage erhält

  @Field(() => String)
  @Prop({ default: 'PENDING' })
  status: FriendshipStatus;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
export type FriendshipDocument = Friendship & Document;

// ✅ Eindeutiger Index für Freundschafts-Kombination
FriendshipSchema.index({ requesterId: 1, recipientId: 1 }, { unique: true });
