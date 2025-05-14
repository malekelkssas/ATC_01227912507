export const USER_SCHEMA_NAME = 'users';

export const USER_FIELDS = {
  ID: '_id',
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  ROLE: 'role',
  BOOKED_EVENTS: 'bookedEvents',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;
