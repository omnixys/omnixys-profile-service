import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../model/entity/profile.entity.js';
import { UUID } from 'crypto';
import { runWithTracing } from '../../observability/tracing.util.js';
import { LoggerPlus } from '../../observability/logger-plus.js';
import { LoggerService } from '../../observability/logger.service.js';
import { SpanStatusCode } from '@opentelemetry/api';
import { FullProfile } from '../resolver/profile-query.resolver.js';
import { FollowReadService } from './follow-read.service.js';
import { FriendshipReadService } from './friendship-read.service.js';
import { ApolloError } from 'apollo-server';
// import { PostReadService } from './post-read.service.js';

@Injectable()
export class ProfileReadService {
  readonly #profileModel: Model<ProfileDocument>;
  readonly #loggerService: LoggerService;
  readonly #logger: LoggerPlus;

  readonly #followReadService: FollowReadService;
  readonly #friendshipService: FriendshipReadService;
  //   readonly #postReadService: PostReadService;

  constructor(
    @InjectModel(Profile.name) profileModel: Model<ProfileDocument>,
    loggerService: LoggerService,
    followReadService: FollowReadService,
    friendshipReadService: FriendshipReadService,
    // postReadService: PostReadService,
  ) {
    this.#profileModel = profileModel;
    this.#loggerService = loggerService;
    this.#logger = this.#loggerService.getLogger(ProfileReadService.name);
    this.#followReadService = followReadService;
    this.#friendshipService = friendshipReadService;
    // this.#postReadService = postReadService;
  }

  async findByUserId(userId: UUID): Promise<Profile> {
    const profile = this.#profileModel.findOne({ userId });
    if (!profile) {
      throw new ApolloError(
        `Kein Profil gefunden für UserID: ${userId}`,
        'PROFILE_NOT_FOUND',
      );
    }

    this.#logger.debug(`Found profile for userId ${userId}`);
    return profile;
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

  async getMyFullProfile(username: string): Promise<FullProfile> {
    this.#logger.debug('getFullProfile:  username=%s', username);

    const profile = await this.findByUsername(username);

    const profileId = profile.id;
    this.#logger.debug('getFullProfile: profileId=%s', profileId);

    const followerCount =
      await this.#followReadService.getFollowerCount(profileId);
    const followingCount =
      await this.#followReadService.getFollowingCount(profileId);
    const friendships = await this.#friendshipService.getFriends(profileId);

    return {
      profile,
      followCount: {
        followers: followerCount,
        following: followingCount,
      },
      friendships: friendships.length,
    };
  }

  async getFullProfile(userId: UUID): Promise<FullProfile> {
    this.#logger.debug('getFullProfile:  userId: %s', userId);

    const profile = await this.findByUserId(userId);

    if (!profile) {
      throw new ApolloError(
        `Kein Profil gefunden für UserID: ${userId}`,
        'PROFILE_NOT_FOUND',
      );
    }

    this.#logger.debug('getFullProfile: profile: %o', profile);

    const profileId = profile.id;
    this.#logger.debug('getFullProfile: profileId: %s', profileId);

    const followerCount =
      await this.#followReadService.getFollowerCount(profileId);
    const followingCount =
      await this.#followReadService.getFollowingCount(profileId);
    const friendships = await this.#friendshipService.getFriends(profileId);
    // const posts = await this.#postReadService.getPostsByProfile(profile.id);

    return {
      profile,
      followCount: {
        followers: followerCount,
        following: followingCount,
      },
      friendships: friendships.length,
    };
  }
}
