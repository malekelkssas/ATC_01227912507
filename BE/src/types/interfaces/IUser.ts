import { UserRoleEnum } from '../enums';
import { Document } from 'mongoose';
import { IEvent } from './IEvent';
import mongoose from 'mongoose';
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    bookedEvents: (IEvent | string | mongoose.Types.ObjectId)[];
    createdAt: Date;
    updatedAt: Date;
  }