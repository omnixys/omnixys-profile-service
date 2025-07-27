import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../model/entity/post.model.js';

@Injectable()
export class PostReadService {
  readonly #postModel: Model<PostDocument>;

  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    this.#postModel = postModel;
  }

  /**
   * Hole alle Posts eines bestimmten Profils (nur nicht archiviert).
   */
  async getPostsByProfile(profileId: string): Promise<Post[]> {
    return this.#postModel
      .find({ profileId, isArchived: false })
      .sort({ createdAt: -1 });
  }

  /**
   * Hole den globalen Feed (alle Posts, nicht archiviert, neueste zuerst).
   */
  async getFeed(limit = 50): Promise<Post[]> {
    return this.#postModel
      .find({ isArchived: false })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  /**
   * Hole ein einzelnes Post-Detail.
   */
  async getPostById(id: string): Promise<Post | null> {
    return this.#postModel.findById(id);
  }

  /**
   * Zähle alle Posts für ein bestimmtes Profil.
   */
  async getPostCountByProfile(profileId: string): Promise<number> {
    return this.#postModel.countDocuments({ profileId, isArchived: false });
  }
}
