import { UserRoleEnum } from '@/types';

export interface IJwtUser {
    id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
}
