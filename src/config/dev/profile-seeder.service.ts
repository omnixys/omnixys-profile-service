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
import { FriendshipReadService } from '../../profile/service/friendship-read.service.js';
import { FriendshipWriteService } from '../../profile/service/friendship-write.service.js';
import { friendships } from './friendships.js';

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

    readonly #friendshipReadService: FriendshipReadService;
    readonly #friendshipWriteService: FriendshipWriteService;


  constructor(
    profileReadService: ProfileReadService,
    profileWriteService: ProfileWriteService,
    followWriteService: FollowWriteService,
    followReadService: FollowReadService,
      postWriteService: PostWriteService,
    friendshipReadService: FriendshipReadService,
    friendshipWriteService: FriendshipWriteService,
  ) {
    this.#profileReadService = profileReadService;
    this.#profileWriteService = profileWriteService;
    this.#followWriteService = followWriteService;
    this.#followReadService = followReadService;
      this.#postWriteService = postWriteService;
    this.#friendshipReadService = friendshipReadService;
    this.#friendshipWriteService = friendshipWriteService;
    this.#logger.debug('ProfileSeederService initialized');
  }

  async onModuleInit(): Promise<void> {
    this.#logger.debug('🚀 Starting Profile Seeder...');
    await this.#seedProfiles();

    this.#logger.debug('🧹 Clearing Posts & Follows collections...');
    await this.#seedPosts();
      await this.#seedFollows();
      await this.#seedFriendships();
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

    async #seedPosts(): Promise<void> {
        for (const post of posts) {
            const profile = await this.#profileReadService.findByUsername(post.profileUsername);
            if (!profile) {
                this.#logger.warn(`Profile not found for post: ${post.profileUsername}`);
                continue;
            }


            // Check: existiert Post mit gleichem Content für diesen User?
            const exists = await this.#postWriteService.findByContentAndProfile(post.content, profile.id);
            if (exists) {
                this.#logger.debug(`Post already exists for ${post.profileUsername}, skipping.`);
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

            const followerProfile = await this.#profileReadService.findByUsername(follow.followerId);
            const followedProfile = await this.#profileReadService.findByUsername(follow.followedId);
            if (!followerProfile || !followedProfile) {
                this.#logger.warn(`⚠ Profile not found for follow: ${follow.followerId} -> ${follow.followedId}`);
                continue;
            }
            // Check: existiert Follow-Beziehung bereits?
            if (followerProfile.id === followedProfile.id) {
                this.#logger.debug(`Skipping self-follow for ${follow.followerId}`);
                continue;
            }
            const exists = await this.#followReadService.exists(
                followerProfile.id,
                followedProfile.id,
            );


            if (!exists) {
                await this.#followWriteService.followUser(
                    followerProfile.id,
                    followedProfile.id,
                );
                this.#logger.debug(`✅ Follow created: ${follow.followerId} -> ${follow.followedId}`);
            } else {
                this.#logger.debug(`Follow already exists: ${follow.followerId} -> ${follow.followedId}`);

            }
        }
    }

    async #seedFriendships(): Promise<void> {
        for (const friendship of friendships) {
            const requester = await this.#profileReadService.findByUsername(friendship.requesterUsername);
            const recipient = await this.#profileReadService.findByUsername(friendship.recipientUsername);

            if (!requester || !recipient) {
                this.#logger.warn(`⚠ Profile not found for friendship: ${friendship.requesterUsername} <-> ${friendship.recipientUsername}`);
                continue;
            }

            const existing = await this.#friendshipReadService.findExisting(requester.id, recipient.id);

            if (!existing) {
                // Neue Anfrage senden
                const newFriendship = await this.#friendshipWriteService.sendRequest(requester.id, recipient.id);
                this.#logger.debug(`✅ Friendship request created: ${requester.username} → ${recipient.username}`);

                // Direkt Status setzen, wenn ACCEPTED oder DECLINED
                if (friendship.status === 'ACCEPTED') {
                    await this.#friendshipWriteService.acceptRequest(newFriendship.id);
                    this.#logger.debug(`✅ Friendship accepted: ${requester.username} ↔ ${recipient.username}`);
                } else if (friendship.status === 'DECLINED') {
                    await this.#friendshipWriteService.declineRequest(newFriendship.id);
                    this.#logger.debug(`❌ Friendship declined: ${requester.username} ↔ ${recipient.username}`);
                }
            } else {
                this.#logger.debug(`Friendship already exists: ${requester.username} <-> ${recipient.username}`);
            }
        }
    }

}
