import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../model/entity/profile.model.js';
import { UUID } from 'crypto';
import { runWithTracing } from '../../observability/tracing.util.js';
import { LoggerPlus } from '../../observability/logger-plus.js';
import { LoggerService } from '../../observability/logger.service.js';
import { SpanStatusCode } from '@opentelemetry/api';

@Injectable()
export class ProfileReadService {
  readonly #profileModel: Model<ProfileDocument>;
  readonly #loggerService: LoggerService;
  readonly #logger: LoggerPlus;

  constructor(
    @InjectModel(Profile.name) profileModel: Model<ProfileDocument>,
    loggerService: LoggerService,
  ) {
    this.#profileModel = profileModel;
    this.#loggerService = loggerService;
    this.#logger = this.#loggerService.getLogger(ProfileReadService.name);
  }

  async findByUserId(userId: UUID): Promise<Profile> {
    return this.#profileModel.findOne({ userId });
  }

  async findByUsername(username: string): Promise<ProfileDocument> {
    this.#logger.debug(`Finding profile by username: ${username}`);
    const profile = await runWithTracing(
      this.findByUsername.name,
      this.#logger,
      async (span) => {
        if (!username) throw new BadRequestException('username is required');
        const result = await this.#profileModel.findOne({ username });
        span.setStatus({ code: SpanStatusCode.OK });
        return result as ProfileDocument;
      },
    );
    this.#logger.debug(`Found profile: ${profile}`);
    return profile;
  }

  async findAllProfiles(): Promise<Profile[]> {
    return this.#profileModel.find().exec();
  }
}
