import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow } from '../model/entity/follow.model';

@Injectable()
export class FollowWriteService {
    constructor(@InjectModel(Follow.name) private readonly followModel: Model<Follow>) { }

    async followUser(followerId: string, followedId: string): Promise<boolean> {
        const exists = await this.followModel.findOne({ followerId, followedId });
        if (exists) return true;
        await this.followModel.create({ followerId, followedId });
        return true;
    }

    async unfollowUser(followerId: string, followedId: string): Promise<boolean> {
        await this.followModel.deleteOne({ followerId, followedId });
        return true;
    }
}
