/**
 * Seed-Daten für Follower-Beziehungen.
 * Hinweis: followerId und followedId werden im Seeder dynamisch ergänzt.
 */
export const follows = [
  // Admin folgt Erik und Caleb
  {
    id: '00000000-0000-0000-0000-000000000201',
    followerId: '00000000-0000-0000-0000-000000000000',
    followedId: '00000000-0000-0000-0000-000000000005',
    createdAt: new Date('2025-07-22T09:00:00Z'),
    updatedAt: new Date('2025-07-22T09:00:00Z'),
  },
  {
    id: '00000000-0000-0000-0000-000000000202',
    followerId: '00000000-0000-0000-0000-000000000000',
    followedId: '00000000-0000-0000-0000-000000000025',
    createdAt: new Date('2025-07-22T09:05:00Z'),
    updatedAt: new Date('2025-07-22T09:05:00Z'),
  },

  // Erik folgt Admin und Rae
  {
    id: '00000000-0000-0000-0000-000000000203',
    followerId: '00000000-0000-0000-0000-000000000005',
    followedId: '00000000-0000-0000-0000-000000000000',
    createdAt: new Date('2025-07-22T09:10:00Z'),
    updatedAt: new Date('2025-07-22T09:10:00Z'),
  },
  {
    followerId: '00000000-0000-0000-0000-000000000005',
    followedId: '00000000-0000-0000-0000-000000000001',
    createdAt: new Date('2025-07-22T09:15:00Z'),
    updatedAt: new Date('2025-07-22T09:15:00Z'),
  },

  // Caleb folgt allen außer sich selbst
  {
    id: '00000000-0000-0000-0000-000000000204',
    followerId: '00000000-0000-0000-0000-000000000025',
    followedId: '00000000-0000-0000-0000-000000000000',
    createdAt: new Date('2025-07-22T09:20:00Z'),
    updatedAt: new Date('2025-07-22T09:20:00Z'),
  },
  {
    id: '00000000-0000-0000-0000-000000000205',
    followerId: '00000000-0000-0000-0000-000000000025',
    followedId: '00000000-0000-0000-0000-000000000005',
    createdAt: new Date('2025-07-22T09:25:00Z'),
    updatedAt: new Date('2025-07-22T09:25:00Z'),
  },
  {
    id: '00000000-0000-0000-0000-000000000206',
    followerId: '00000000-0000-0000-0000-000000000025',
    followedId: '00000000-0000-0000-0000-000000000026',
    createdAt: new Date('2025-07-22T09:30:00Z'),
    updatedAt: new Date('2025-07-22T09:30:00Z'),
  },
  {
    id: '00000000-0000-0000-0000-000000000207',
    followerId: '00000000-0000-0000-0000-000000000025',
    followedId: '00000000-0000-0000-0000-000000000001',
    createdAt: new Date('2025-07-22T09:35:00Z'),
    updatedAt: new Date('2025-07-22T09:35:00Z'),
  },

  // Leroy folgt Caleb
  {
    id: '00000000-0000-0000-0000-000000000208',
    followerId: '00000000-0000-0000-0000-000000000026',
    followedId: '00000000-0000-0000-0000-000000000025',
    createdAt: new Date('2025-07-22T09:40:00Z'),
    updatedAt: new Date('2025-07-22T09:40:00Z'),
  },

  // Rae folgt Admin
  {
    id: '00000000-0000-0000-0000-000000000209',
    followerId: '00000000-0000-0000-0000-000000000001',
    followedId: '00000000-0000-0000-0000-000000000000',
    createdAt: new Date('2025-07-22T09:45:00Z'),
    updatedAt: new Date('2025-07-22T09:45:00Z'),
  },
];
