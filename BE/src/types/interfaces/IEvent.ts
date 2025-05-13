import { Document } from "mongoose";
import { ILocalized } from "./ILocalizedName";
import { ITag } from "./ITag";
import { Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    name: ILocalized;
    description: ILocalized;
    venue: ILocalized;
    category: (Schema.Types.ObjectId | ITag | string)[];
    imageUrl: string;
    price: number;
    date: Date;
}