import { UUID } from 'crypto';
import {
  OmnixysColorScheme,
  ThemeMode,
} from '../../profile/model/entity/profile.model';

/**
 * Seed-Daten für Benutzerprofile.
 */
export const profiles = [
  {
    userId: '00000000-0000-0000-0000-000000000000' as UUID,
    language: 'de',
    colorMode: 'dark' as ThemeMode,
    showWelcomeScreen: true,
    username: 'admin',
    colorScheme: 'blue' as OmnixysColorScheme,
  },
  {
    userId: '00000000-0000-0000-0000-000000000005' as UUID,
    language: 'en',
    colorMode: 'light' as ThemeMode,
    showWelcomeScreen: false,
    username: 'erik',
    colorScheme: 'red' as OmnixysColorScheme,
  },
  {
    userId: '00000000-0000-0000-0000-000000000025' as UUID,
    language: 'fr',
    colorMode: 'system' as ThemeMode,
    showWelcomeScreen: true,
    username: 'caleb-script',
    colorScheme: 'yellow' as OmnixysColorScheme,
  },
  {
    userId: '00000000-0000-0000-0000-000000000026' as UUID,
    language: 'de',
    colorMode: 'dark' as ThemeMode,
    showWelcomeScreen: false,
    username: 'leroy135',
    colorScheme: 'green' as OmnixysColorScheme,
  },
  {
    userId: '00000000-0000-0000-0000-000000000001' as UUID,
    language: 'en',
    colorMode: 'light' as ThemeMode,
    showWelcomeScreen: true,
    username: 'rae',
    colorScheme: 'original' as OmnixysColorScheme,
  },
];
