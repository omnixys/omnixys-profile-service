import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from '../../observability/logger.service.js';
import { LoggerPlus } from '../../observability/logger-plus.js';
import {
  Friendship,
  FriendshipDocument,
} from '../model/entity/friendship.entity.js';

@Injectable()
export class FriendshipReadService {
  readonly #friendshipModel: Model<FriendshipDocument>;
  readonly #loggerService: LoggerService;
  readonly #logger: LoggerPlus;

  constructor(
    @InjectModel(Friendship.name) friendshipModel: Model<FriendshipDocument>,
    loggerService: LoggerService,
  ) {
    this.#friendshipModel = friendshipModel;
    this.#loggerService = loggerService;
    this.#logger = this.#loggerService.getLogger(FriendshipReadService.name);
  }

  async getFriends(profileId: string): Promise<Friendship[]> {
    this.#logger.debug(`Retrieving friends for profileId: ${profileId}`);
    return this.#friendshipModel.find({
      $or: [{ requesterId: profileId }, { recipientId: profileId }],
      status: 'ACCEPTED',
    });
  }

    async getFriendshipById(friendshipId: string): Promise<Friendship | null> {
    this.#logger.debug(`Retrieving friendship by ID: ${friendshipId}`);
    return this.#friendshipModel.findById(friendshipId);
    }

    async getFriendshipByProfiles(
        profileA: string,
        profileB: string,
    ): Promise<Friendship | null> {
    this.#logger.debug(`Retrieving friendship between ${profileA} and ${profileB}`);
    return this.#friendshipModel.findOne({
      $or: [
        { requesterId: profileA, recipientId: profileB },
        { requesterId: profileB, recipientId: profileA },
      ],
    });
  }

    async getPendingRequests(profileId: string): Promise<Friendship[]> {
        this.#logger.debug(`Retrieving pending requests for profileId: ${profileId}`);
        return this.#friendshipModel.find({
        recipientId: profileId,
        status: 'PENDING',
        });
    }

    async getSentRequests(profileId: string): Promise<Friendship[]> {
        this.#logger.debug(`Retrieving sent requests for profileId: ${profileId}`);
        return this.#friendshipModel.find({
        requesterId: profileId,
        status: 'PENDING',
        });
    }

    async getAllFriendships(): Promise<Friendship[]> {
        this.#logger.debug('Retrieving all friendships');
        return this.#friendshipModel.find();
    }

  async findExisting(
    profileA: string,
    profileB: string,
  ): Promise<Friendship | null> {
    return this.#friendshipModel.findOne({
      $or: [
        { requesterId: profileA, recipientId: profileB },
        { requesterId: profileB, recipientId: profileA },
      ],
    });
  }
}
