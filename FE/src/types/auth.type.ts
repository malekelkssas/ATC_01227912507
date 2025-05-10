import { type UserRoleEnum } from '@/types/enums';

// User type
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
};

// Auth state type
export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}; 