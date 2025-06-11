import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../model/entity/profile.model.js';
import { UUID } from 'crypto';

@Injectable()
export class ProfileReadService {
  readonly #profileModel: Model<ProfileDocument>;

  constructor(@InjectModel(Profile.name) profileModel: Model<ProfileDocument>) {
    this.#profileModel = profileModel;
  }

  async findByUserId(userId: UUID): Promise<Profile> {
    return this.#profileModel.findOne({ userId });
  }

  async findByUsername(username: string): Promise<ProfileDocument> {
    return this.#profileModel.findOne({ username });
  }
}
