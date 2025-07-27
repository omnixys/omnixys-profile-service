import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from '../model/entity/follow.model.js';

@Injectable()
export class FollowWriteService {
  readonly #followModel: Model<FollowDocument>;

  constructor(@InjectModel(Follow.name) followModel: Model<FollowDocument>) {
    this.#followModel = followModel;
  }

  async followUser(followerId: string, followedId: string): Promise<boolean> {
    const exists = await this.#followModel.findOne({ followerId, followedId });
    if (exists) return true;
    await this.#followModel.create({ followerId, followedId });
    return true;
  }

  async unfollowUser(followerId: string, followedId: string): Promise<boolean> {
    await this.#followModel.deleteOne({ followerId, followedId });
    return true;
  }

  async clearAll(): Promise<void> {
    await this.#followModel.deleteMany({});
  }
}
