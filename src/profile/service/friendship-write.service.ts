import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Friendship,
  FriendshipDocument,
} from '../model/entity/friendship.entity.js';
import { LoggerPlus } from '../../observability/logger-plus.js';
import { LoggerService } from '../../observability/logger.service.js';

@Injectable()
export class FriendshipWriteService {
  readonly #friendshipModel: Model<FriendshipDocument>;
  readonly #logger: LoggerPlus;

  constructor(
    @InjectModel(Friendship.name) friendshipModel: Model<FriendshipDocument>,
    loggerService: LoggerService,
  ) {
    this.#friendshipModel = friendshipModel;
    this.#logger = loggerService.getLogger(FriendshipWriteService.name);
  }

  async sendRequest(
    requesterId: string,
    recipientId: string,
  ): Promise<Friendship> {
    this.#logger.debug(
      `📨 Sending friend request from ${requesterId} to ${recipientId}`,
    );

    if (requesterId === recipientId) {
      throw new BadRequestException(
        '❌ Cannot send friend request to yourself.',
      );
    }

    const existing = await this.#friendshipModel.findOne({
      $or: [
        { requesterId, recipientId },
        { requesterId: recipientId, recipientId: requesterId },
      ],
    });

    if (existing) {
      throw new BadRequestException(
        '❌ Friend request or friendship already exists.',
      );
    }

    const friendship = await this.#friendshipModel.create({
      requesterId,
      recipientId,
      status: 'PENDING',
    });

    this.#logger.info(`✅ Friend request created: ${friendship.id}`);
    return friendship;
  }

  async acceptRequest(friendshipId: string): Promise<Friendship> {
    this.#logger.debug(`✅ Accepting friend request: ${friendshipId}`);
    const friendship = await this.#friendshipModel.findById(friendshipId);
    if (!friendship) throw new NotFoundException('❌ Friendship not found.');

    if (friendship.status === 'ACCEPTED') {
      throw new BadRequestException('Friendship is already accepted.');
    }

    friendship.status = 'ACCEPTED';
    await friendship.save();

    this.#logger.info(`🤝 Friendship accepted: ${friendship.id}`);
    return friendship;
  }

  async declineRequest(friendshipId: string): Promise<Friendship> {
    this.#logger.debug(`🚫 Declining friend request: ${friendshipId}`);
    const friendship = await this.#friendshipModel.findById(friendshipId);
    if (!friendship) throw new NotFoundException('❌ Friendship not found.');

    if (friendship.status === 'DECLINED') {
      throw new BadRequestException('Friendship request already declined.');
    }

    friendship.status = 'DECLINED';
    await friendship.save();

    this.#logger.info(`❌ Friendship declined: ${friendship.id}`);
    return friendship;
  }

  async removeFriendship(friendshipId: string): Promise<boolean> {
    this.#logger.debug(`🗑 Removing friendship: ${friendshipId}`);
    const result = await this.#friendshipModel.deleteOne({ _id: friendshipId });

    if (result.deletedCount > 0) {
      this.#logger.info(`✅ Friendship removed: ${friendshipId}`);
      return true;
    } else {
      this.#logger.warn(`⚠️ Friendship not found: ${friendshipId}`);
      return false;
    }
  }

  async findExisting(userA: string, userB: string): Promise<Friendship | null> {
    return this.#friendshipModel.findOne({
      $or: [
        { requesterId: userA, recipientId: userB },
        { requesterId: userB, recipientId: userA },
      ],
    });
  }
}
