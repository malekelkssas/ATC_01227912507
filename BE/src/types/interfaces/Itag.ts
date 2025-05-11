import { Document } from 'mongoose';

export interface ITag extends Document {
    _id: string;
    name: string;
    color: string;
}
