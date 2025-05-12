import { UserRoleEnum } from '../enums';
import { Document } from 'mongoose';
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
  }