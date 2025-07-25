import { Resolver, Query, Args } from '@nestjs/graphql';
import { Follow } from '../model/entity/follow.model';
import { FollowReadService } from '../service/follow-read.service';

@Resolver(() => Follow)
export class FollowQueryResolver {
    readonly #followReadService: FollowReadService;

    constructor(
        followReadService: FollowReadService,
    ) {
        this.#followReadService = followReadService;
    }


    /**
     * Liste aller Follower für ein Profil
     */
    @Query(() => [Follow])
    async getFollowers(@Args('profileId') profileId: string): Promise<Follow[]> {
        return this.#followReadService.getFollowers(profileId);
    }

    /**
     * Liste aller Personen, denen ein Profil folgt
     */
    @Query(() => [Follow])
    async getFollowing(@Args('profileId') profileId: string): Promise<Follow[]> {
        return this.#followReadService.getFollowing(profileId);
    }

    /**
     * Anzahl der Follower
     */
    @Query(() => Number)
    async getFollowerCount(@Args('profileId') profileId: string): Promise<number> {
        return this.#followReadService.getFollowerCount(profileId);
    }

    /**
     * Anzahl der Following
     */
    @Query(() => Number)
    async getFollowingCount(@Args('profileId') profileId: string): Promise<number> {
        return this.#followReadService.getFollowingCount(profileId);
    }
}
