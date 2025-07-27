import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Post } from '../model/entity/post.entity.js';
import { CreatePostInput } from '../model/dto/create-post.input.js';
import { UpdatePostInput } from '../model/dto/update-post.input.js';
import { PostWriteService } from '../service/post-write.service.js';

@Resolver(() => Post)
export class PostMutationResolver {
  readonly #postWriteService: PostWriteService;

  constructor(postWriteService: PostWriteService) {
    this.#postWriteService = postWriteService;
  }

  @Mutation(() => Post)
  async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
    return this.#postWriteService.createPost(input);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: UpdatePostInput,
  ): Promise<Post> {
    return this.#postWriteService.updatePost(id, input);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string): Promise<boolean> {
    return this.#postWriteService.deletePost(id);
  }

  @Mutation(() => Boolean)
  async archivePost(@Args('id') id: string): Promise<boolean> {
    return this.#postWriteService.archivePost(id);
  }

  @Mutation(() => Boolean)
  async unarchivePost(@Args('id') id: string): Promise<boolean> {
    return this.#postWriteService.unarchivePost(id);
  }
}
