/**
 * Seed-Daten für Follower-Beziehungen.
 * Hinweis: followerId und followedId werden im Seeder dynamisch ergänzt.
 */
export const follows = [
  // Admin folgt Erik und Caleb
  {
    followerId: 'admin',
    followedId: 'erik',
    createdAt: new Date('2025-07-22T09:00:00Z'),
    updatedAt: new Date('2025-07-22T09:00:00Z'),
  },
  {
    followerId: 'admin',
    followedId: 'caleb-script',
    createdAt: new Date('2025-07-22T09:05:00Z'),
    updatedAt: new Date('2025-07-22T09:05:00Z'),
  },

  // Erik folgt Admin und Rae
  {
    followerId: 'erik',
    followedId: 'admin',
    createdAt: new Date('2025-07-22T09:10:00Z'),
    updatedAt: new Date('2025-07-22T09:10:00Z'),
  },
  {
    followerId: 'erik',
    followedId: 'rae',
    createdAt: new Date('2025-07-22T09:15:00Z'),
    updatedAt: new Date('2025-07-22T09:15:00Z'),
  },

  // Caleb folgt allen außer sich selbst
  {
    followerId: 'caleb-script',
    followedId: 'admin',
    createdAt: new Date('2025-07-22T09:20:00Z'),
    updatedAt: new Date('2025-07-22T09:20:00Z'),
  },
  {
    followerId: 'caleb-script',
    followedId: 'erik',
    createdAt: new Date('2025-07-22T09:25:00Z'),
    updatedAt: new Date('2025-07-22T09:25:00Z'),
  },
  {
    followerId: 'caleb-script',
    followedId: 'leroy135',
    createdAt: new Date('2025-07-22T09:30:00Z'),
    updatedAt: new Date('2025-07-22T09:30:00Z'),
  },
  {
    followerId: 'caleb-script',
    followedId: 'rae',
    createdAt: new Date('2025-07-22T09:35:00Z'),
    updatedAt: new Date('2025-07-22T09:35:00Z'),
  },

  // Leroy folgt Caleb
  {
    followerId: 'leroy135',
    followedId: 'caleb-script',
    createdAt: new Date('2025-07-22T09:40:00Z'),
    updatedAt: new Date('2025-07-22T09:40:00Z'),
  },

  // Rae folgt Admin
  {
    followerId: 'rae',
    followedId: 'admin',
    createdAt: new Date('2025-07-22T09:45:00Z'),
    updatedAt: new Date('2025-07-22T09:45:00Z'),
  },
];
