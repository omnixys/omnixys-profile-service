import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../model/entity/profile.model.js';
import { UpdateProfileInput } from '../model/dto/update-profile.input.js';
import { ProfileReadService } from './profile-read.service.js';

@Injectable()
export class ProfileWriteService {
  readonly #profileModel: Model<ProfileDocument>;
  readonly #profileReadService: ProfileReadService;

  constructor(
    @InjectModel(Profile.name) profileModel: Model<ProfileDocument>,
    profileReadService: ProfileReadService,
  ) {
    this.#profileModel = profileModel;
    this.#profileReadService = profileReadService;
  }

  async create(profileData: Partial<Profile>): Promise<Profile> {
    const created = new this.#profileModel(profileData);
    return created.save();
  }

  async update(username: string, input: UpdateProfileInput): Promise<Profile> {
    const profile = await this.#profileReadService.findByUsername(username);

    if (!profile) {
      throw new NotFoundException(
        `Profil mit Benutzername '${username}' nicht gefunden`,
      );
    }

    // Eingabewerte auf Dokument anwenden
    Object.assign(profile, input);

    // Dokument speichern
    return profile.save();
  }
}
