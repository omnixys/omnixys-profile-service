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
  async deleteProfile(id: string): Promise<boolean> {
    const result = await this.#profileModel.findByIdAndDelete(id);
    return !!result;
  }

  async suspendProfile(id: string): Promise<boolean> {
    const profile = await this.#profileModel.findById(id);
    if (!profile) {
      throw new NotFoundException(`Profil mit ID '${id}' nicht gefunden`);
    }
    profile.settings.isSuspended = true;
    await profile.save();
    return true;
  }
  async blockUser(blockedId: string): Promise<boolean> {
    const profile = await this.#profileReadService.findByUsername(blockedId);
    if (!profile) {
      throw new NotFoundException(
        `Profil mit ID '${blockedId}' nicht gefunden`,
      );
    }
    // Hier könnte Logik zum Speichern der Blockierung hinzugefügt werden
    // Zum Beispiel: profile.blockedList.push({ blockedId, blockedAt: new Date() });
    // profile.save();
    return true;
  }

  async unblockUser(blockedId: string): Promise<boolean> {
    const profile = await this.#profileReadService.findByUsername(blockedId);
    if (!profile) {
      throw new NotFoundException(
        `Profil mit ID '${blockedId}' nicht gefunden`,
      );
    }
    // Hier könnte Logik zum Entfernen der Blockierung hinzugefügt werden
    // Zum Beispiel: profile.blockedList = profile.blockedList.filter(b => b.blockedId !== blockedId);
    // profile.save();
    return true;
  }
  async reportUser(reportedId: string, reason: string): Promise<boolean> {
    const profile = await this.#profileReadService.findByUsername(reportedId);
    if (!profile) {
      throw new NotFoundException(
        `Profil mit ID '${reportedId}' nicht gefunden`,
      );
    }
    if (!reason) {
      throw new Error('Reason for reporting must be provided');
    }
    //
    // Hier könnte Logik zum Speichern des Berichts hinzugefügt werden
    // Zum Beispiel: profile.reports.push({ reason, date: new Date() });
    // profile.save();
    return true;
  }
}
