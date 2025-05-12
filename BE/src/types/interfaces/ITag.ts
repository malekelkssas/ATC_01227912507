import { Document } from 'mongoose';
import { ILocalized } from './ILocalizedName';

export interface ITag extends Document {
    _id: string;
    name: ILocalized;
    color: string;
}
