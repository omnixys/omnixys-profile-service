import { UUID } from 'crypto';
import {
  OmnixysColorScheme,
  ThemeMode,
} from '../../profile/model/entity/profile-settings.model.js';

/**
 * Seed-Daten für Benutzerprofile mit info & settings.
 */

export const profiles = [
  {
    userId: '00000000-0000-0000-0000-000000000000' as UUID,
    username: 'admin',

    info: {
      headline: 'Software Engineer at Omnixys',
      location: 'Berlin, Germany',
      profileImage: '/uploads/admin.jpg',
      coverImage: '/uploads/admin-cover.jpg',
      socialLinks: [
        'https://linkedin.com/in/admin',
        'https://twitter.com/admin',
      ],
    },

    settings: {
      isSuspended: false,
      language: 'de',
      colorMode: 'dark' as ThemeMode,
      colorScheme: 'blue' as OmnixysColorScheme,
      showWelcomeScreen: true,
      blockedUsers: [
        {
          blockedId: '00000000-0000-0000-0000-000000000002',
          blockedUsername: 'john_doe',
          blockedAt: new Date(),
          reason: 'Spamming in comments',
        },
        {
          blockedId: '00000000-0000-0000-0000-000000000003',
          blockedUsername: 'jane_doe',
          blockedAt: new Date(),
          reason: 'Inappropriate content',
        },
      ],
    },
  },
  {
    userId: '00000000-0000-0000-0000-000000000005' as UUID,
    username: 'erik',
    info: {
      headline: 'Backend Developer',
      location: 'Hamburg, Germany',
      profileImage: '/uploads/erik.jpg',
      coverImage: '/uploads/erik-cover.jpg',
      socialLinks: [
        'https://linkedin.com/in/erik',
        'https://github.com/erik-dev',
      ],
    },
    settings: {
      isSuspended: false,
      language: 'en',
      colorMode: 'light' as ThemeMode,
      colorScheme: 'red' as OmnixysColorScheme,
      showWelcomeScreen: false,
    },
  },
  {
    userId: '00000000-0000-0000-0000-000000000025' as UUID,
    username: 'caleb-script',
    info: {
      headline: 'Fullstack Engineer & DevOps Enthusiast',
      location: 'Paris, France',
      profileImage: '/uploads/caleb.jpg',
      coverImage: '/uploads/caleb-cover.jpg',
      socialLinks: [
        'https://linkedin.com/in/caleb',
        'https://github.com/calebscript',
      ],
    },
    settings: {
      isSuspended: false,
      language: 'fr',
      colorMode: 'system' as ThemeMode,
      colorScheme: 'yellow' as OmnixysColorScheme,
      showWelcomeScreen: true,
    },
  },
  {
    userId: '00000000-0000-0000-0000-000000000026' as UUID,
    username: 'leroy135',
    info: {
      headline: 'Cloud Architect',
      location: 'Zurich, Switzerland',
      profileImage: '/uploads/leroy.jpg',
      coverImage: '/uploads/leroy-cover.jpg',
      socialLinks: [
        'https://linkedin.com/in/leroy',
        'https://twitter.com/leroy135',
      ],
    },
    settings: {
      isSuspended: false,
      language: 'de',
      colorMode: 'dark' as ThemeMode,
      colorScheme: 'green' as OmnixysColorScheme,
      showWelcomeScreen: false,
    },
  },
  {
    userId: '00000000-0000-0000-0000-000000000001' as UUID,
    username: 'rae',
    info: {
      headline: 'Frontend Developer & Designer',
      location: 'London, UK',
      profileImage: '/uploads/rae.jpg',
      coverImage: '/uploads/rae-cover.jpg',
      socialLinks: [
        'https://linkedin.com/in/rae',
        'https://twitter.com/rae_dev',
      ],
    },
    settings: {
      isSuspended: false,
      language: 'en',
      colorMode: 'light' as ThemeMode,
      colorScheme: 'original' as OmnixysColorScheme,
      showWelcomeScreen: true,
    },
  },
];
