import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../model/entity/post.model.js';
import { CreatePostInput } from '../model/dto/create-post.input.js';
import { UpdatePostInput } from '../model/dto/update-post.input.js';
import { PostDocument } from '../model/entity/post.model.js';

@Injectable()
export class PostWriteService {
  readonly #postModel: Model<PostDocument>;

  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    this.#postModel = postModel;
  }

  async createPost(input: CreatePostInput): Promise<Post> {
    const post = new this.#postModel(input);
    return post.save();
  }

  async updatePost(id: string, input: UpdatePostInput): Promise<Post> {
    const post = await this.#postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    Object.assign(post, input);
    return post.save();
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await this.#postModel.findByIdAndDelete(id);
    return !!result;
  }

  async archivePost(id: string): Promise<boolean> {
    const post = await this.#postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    post.isArchived = true;
    await post.save();
    return true;
  }

  async unarchivePost(id: string): Promise<boolean> {
    const post = await this.#postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    post.isArchived = false;
    await post.save();
    return true;
  }

  async clearAll(): Promise<void> {
    await this.#postModel.deleteMany({});
  }

  async findByContentAndProfile(content: string, profileId: string) {
    return this.#postModel.findOne({ content, profileId });
  }
}
