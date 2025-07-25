import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../model/entity/post.model';
import { CreatePostInput } from '../model/dto/create-post.input';
import { UpdatePostInput } from '../model/dto/update-post.input';

@Injectable()
export class PostWriteService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) { }

    async createPost(input: CreatePostInput): Promise<Post> {
        const post = new this.postModel(input);
        return post.save();
    }

    async updatePost(id: string, input: UpdatePostInput): Promise<Post> {
        const post = await this.postModel.findById(id);
        if (!post) throw new NotFoundException('Post not found');
        Object.assign(post, input);
        return post.save();
    }

    async deletePost(id: string): Promise<boolean> {
        const result = await this.postModel.findByIdAndDelete(id);
        return !!result;
    }

    async archivePost(id: string): Promise<boolean> {
        const post = await this.postModel.findById(id);
        if (!post) throw new NotFoundException('Post not found');
        post.isArchived = true;
        await post.save();
        return true;
    }

    async unarchivePost(id: string): Promise<boolean> {
        const post = await this.postModel.findById(id);
        if (!post) throw new NotFoundException('Post not found');
        post.isArchived = false;
        await post.save();
        return true;
    }
}
