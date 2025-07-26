import { Injectable, OnModuleInit } from '@nestjs/common';
import { profiles } from './profiles.js';
import { ProfileReadService } from '../../profile/service/profile-read.service.js';
import { ProfileWriteService } from '../../profile/service/profile-write.service.js';
import { FollowWriteService } from '../../profile/service/follow-write.service.js';
import { FollowReadService } from '../../profile/service/follow-read.service.js';
import { PostWriteService } from '../../profile/service/post-write.service.js';
import { getLogger } from '../../logger/logger.js';
import { follows } from './follows.js';
import { posts } from './posts.js';

/**
 * Initialisiert Standard-Profiles für Benachrichtigungen, wenn sie noch nicht vorhanden sind.
 * Wird automatisch beim Modulstart ausgeführt.
 */
@Injectable()
export class ProfileSeederService implements OnModuleInit {
  readonly #logger = getLogger(ProfileSeederService.name);
  readonly #profileReadService: ProfileReadService;
  readonly #profileWriteService: ProfileWriteService;

  readonly #followWriteService: FollowWriteService;
  readonly #followReadService: FollowReadService;

  readonly #postWriteService: PostWriteService;

  constructor(
    profileReadService: ProfileReadService,
    profileWriteService: ProfileWriteService,
    followWriteService: FollowWriteService,
    followReadService: FollowReadService,
    postWriteService: PostWriteService,
  ) {
    this.#profileReadService = profileReadService;
    this.#profileWriteService = profileWriteService;
    this.#followWriteService = followWriteService;
    this.#followReadService = followReadService;
    this.#postWriteService = postWriteService;
  }

  async onModuleInit(): Promise<void> {
    this.#logger.debug('🚀 Starting Profile Seeder...');
    await this.#seedProfiles();

    this.#logger.debug('🧹 Clearing Posts & Follows collections...');
    await this.#clearPostsAndFollows();
    await this.#seedPosts();
    await this.#seedFollows();
    this.#logger.debug('✅ Seeding completed successfully!');
  }
  /**
   * Legt Demo-Profiles an, falls noch nicht vorhanden.
   */
  async #seedProfiles(): Promise<void> {
    for (const profile of profiles) {
      const exists = await this.#profileReadService.findByUserId(
        profile.userId,
      );

      if (!exists) {
        await this.#profileWriteService.create(profile);
      }
    }
  }

  async #clearPostsAndFollows(): Promise<void> {
    await this.#postWriteService.clearAll();
    // await this.#followWriteService.clearAll();
    this.#logger.debug('✅ Cleared Posts and Follows collections.');
  }

  async #seedPosts(): Promise<void> {
    for (const post of posts) {
      const profile = await this.#profileReadService.findByUsername(
        post.profileUsername,
      );
      if (!profile) {
        this.#logger.warn(
          `Profile not found for post: ${post.profileUsername}`,
        );
        continue;
      }

      await this.#postWriteService.createPost({
        content: post.content,
        media: post.media,
        profileId: profile.id,
        isArchived: post.isArchived,
      });
      this.#logger.debug(`Inserted post for ${post.profileUsername}`);
    }
  }

  async #seedFollows(): Promise<void> {
    for (const follow of follows) {

      const exists = await this.#followReadService.exists(
          follow.followerId,
          follow.followedId,
      );
      if (exists) {
        this.#logger.debug(
            `Follow ${follow.followerId} -> ${follow.followedId} already exists, skipping.`,
        );
        continue;
      }

        await this.#followWriteService.followUser(follow.followerId,
            follow.followedId,);
      this.#logger.debug(
        `Inserted follow: ${follow.followerId} -> ${follow.followedId}`,
      );
    }
  }
}
