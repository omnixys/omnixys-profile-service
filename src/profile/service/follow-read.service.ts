import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow } from '../model/entity/follow.model';

@Injectable()
export class FollowReadService {
    constructor(@InjectModel(Follow.name) private readonly followModel: Model<Follow>) { }

    async getFollowers(profileId: string): Promise<Follow[]> {
        return this.followModel.find({ followedId: profileId });
    }

    async getFollowing(profileId: string): Promise<Follow[]> {
        return this.followModel.find({ followerId: profileId });
    }

    async getFollowerCount(profileId: string): Promise<number> {
        return this.followModel.countDocuments({ followedId: profileId });
    }

    async getFollowingCount(profileId: string): Promise<number> {
        return this.followModel.countDocuments({ followerId: profileId });
    }
}
