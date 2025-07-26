import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from '../model/entity/follow.model.js';
import { SpanStatusCode } from '@opentelemetry/api';
import { LoggerService } from '../../observability/logger.service.js';
import { LoggerPlus } from '../../observability/logger-plus.js';
import { runWithTracing } from '../../observability/tracing.util.js';

@Injectable()
export class FollowReadService {
  readonly #followModel: Model<FollowDocument>;
  readonly #loggerService: LoggerService;
  readonly #logger: LoggerPlus;

  constructor(
    @InjectModel(Follow.name) followModel: Model<FollowDocument>,
    loggerService: LoggerService,
  ) {
    this.#followModel = followModel;
    this.#loggerService = loggerService;
    this.#logger = this.#loggerService.getLogger(FollowReadService.name);
  }

  async getFollowers(profileId: string, limit = 50): Promise<Follow[]> {
    return this.#followModel.find({ followedId: profileId }).limit(limit);
  }

  async exists(followerId: string, followedId: string): Promise<boolean> {
    return !!(await this.#followModel.findOne({ followerId, followedId }));
  }

  async getFollowing(profileId: string, limit = 50): Promise<Follow[]> {
    return runWithTracing(
      'FollowReadService.getFollowing',
      this.#logger,
      async (span) => {
        if (!profileId) throw new BadRequestException('profileId is required');
        if (limit > 100) limit = 100;
        const result = await this.#followModel
          .find({ followerId: profileId })
          .limit(limit)
          .exec();
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      },
    );
  }

  async getFollowerCount(profileId: string): Promise<number> {
    return this.#followModel.countDocuments({ followedId: profileId });
  }

  async getFollowingCount(profileId: string): Promise<number> {
    return this.#followModel.countDocuments({ followerId: profileId });
  }
}
