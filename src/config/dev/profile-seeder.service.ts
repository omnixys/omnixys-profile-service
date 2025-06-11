import { Injectable, OnModuleInit } from '@nestjs/common';
import { profiles } from './profiles.js';
import { ProfileReadService } from '../../profile/service/profile-read.service.js';
import { ProfileWriteService } from '../../profile/service/profile-write.service.js';

/**
 * Initialisiert Standard-Profiles für Benachrichtigungen, wenn sie noch nicht vorhanden sind.
 * Wird automatisch beim Modulstart ausgeführt.
 */
@Injectable()
export class ProfileSeederService implements OnModuleInit {
  readonly #ProfileReadService: ProfileReadService;
  readonly #ProfileWriteService: ProfileWriteService;

  constructor(
    ProfileReadService: ProfileReadService,
    ProfileWriteService: ProfileWriteService,
  ) {
    this.#ProfileReadService = ProfileReadService;
    this.#ProfileWriteService = ProfileWriteService;
  }

  async onModuleInit(): Promise<void> {
    await this.#seedProfiles();
  }

  /**
   * Legt Demo-Profiles an, falls noch nicht vorhanden.
   */
  async #seedProfiles(): Promise<void> {
    for (const profile of profiles) {
      const exists = await this.#ProfileReadService.findByUserId(
        profile.userId,
      );

      if (!exists) {
        await this.#ProfileWriteService.create(profile);
      }
    }
  }
}
