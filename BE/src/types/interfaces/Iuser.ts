import { UserRoleEnum } from '../enums';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
  }