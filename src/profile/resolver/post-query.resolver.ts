import { Resolver, Query, Args } from '@nestjs/graphql';
import { Post } from '../model/entity/post.model';
import { PostReadService } from '../service/post-read.service';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor';
import { HttpExceptionFilter } from '../utils/http-exception.filter';

@Resolver(() => Post)
    @UseGuards(KeycloakGuard)
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(ResponseTimeInterceptor)
export class PostQueryResolver {
      readonly #postReadService: PostReadService;

      constructor(
        postReadService: PostReadService,
      ) {
        this.#postReadService = postReadService;
      }

    @Query(() => [Post])
    async getPostsByProfile(@Args('profileId') profileId: string): Promise<Post[]> {
        return this.#postReadService.getPostsByProfile(profileId);
    }

    @Query(() => [Post])
    async getFeed(): Promise<Post[]> {
        return this.#postReadService.getFeed();
    }
}
