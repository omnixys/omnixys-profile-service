import { Follow, FollowSchema } from './follow.model.js';
import { Friendship, FriendshipSchema } from './friendship.entity.js';
import { Post, PostSchema } from './post.model.js';
import { Profile, ProfileSchema } from './profile.model.js';

export type EntitySchemaType =
  | typeof ProfileSchema
  | typeof FollowSchema
  | typeof PostSchema
  | typeof FriendshipSchema;

/**
 * Definiert eine Mongoose-Entität und deren Schema.
 */
type EntitySchema = {
  name: string;
  schema: EntitySchemaType;
};

/**
 * Liste aller Mongoose-Entitäten und deren Schemas.
 * Wird für die Registrierung im Modul verwendet.
 *
 * Eine Liste von EntitySchemas, die verschiedene Entitäten und ihre zugehörigen Schemata repräsentiert.
 *
 * @type {EntitySchema[]}
 * @property {string} name - Der Name der Entität.
 * @property {object} schema - Das Schema der Entität.
 *
 * Enthaltene Entitäten:
 * - NotificationProfile: Das Schema für Nachrichten vorlagen.
 */
const entitySchemas: EntitySchema[] = [
  { name: Profile.name, schema: ProfileSchema },
  { name: Follow.name, schema: FollowSchema },
  { name: Post.name, schema: PostSchema },
  { name: Friendship.name, schema: FriendshipSchema },
];

/**
 * Exportiert die Entitäten in einem Format, das für die Registrierung im Modul verwendet werden kann.
 */
export const entities = entitySchemas.map(({ name, schema }) => ({
  name,
  schema,
}));
