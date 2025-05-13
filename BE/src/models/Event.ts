import { Schema, model } from "mongoose";
import { IEvent } from "@/types";
import { EVENT_SCHEMA_NAME, TAG_SCHEMA_NAME } from "@/utils/constants";
import autopopulate from 'mongoose-autopopulate';

export const EventSchema = new Schema<IEvent>({
    name: {
        en: {
            type: String,
            required: [true, "English name is required"],
            minlength: [3, "English name must be at least 3 characters long"],
            maxlength: [30, "English name must be less than 30 characters"],
        },
        ar: {
            type: String,
            required: [true, "Arabic name is required"],
            minlength: [3, "Arabic name must be at least 3 characters long"],
            maxlength: [30, "Arabic name must be less than 30 characters"],
        }
    },
    description: {
        en: {
            type: String,
            required: [true, "English description is required"],
            minlength: [10, "English description must be at least 10 characters long"],
            maxlength: [1000, "English description must be less than 1000 characters"],
        },
        ar: {
            type: String,
            required: [true, "Arabic description is required"],
            minlength: [10, "Arabic description must be at least 10 characters long"],
            maxlength: [1000, "Arabic description must be less than 1000 characters"],
        }
    },
    category: { type: [Schema.Types.ObjectId], ref: TAG_SCHEMA_NAME, required: [true, "Category is required"], autopopulate: true },
    venue: {
        en: {
            type: String,
            required: [true, "English venue is required"],
            minlength: [3, "English venue must be at least 3 characters long"],
            maxlength: [100, "English venue must be less than 100 characters"],
        },
        ar: {
            type: String,
            required: [true, "Arabic venue is required"],
            minlength: [3, "Arabic venue must be at least 3 characters long"],
            maxlength: [100, "Arabic venue must be less than 100 characters"],
        }
    },
    imageUrl: { type: String, required: [true, "Image URL is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    date: { type: Date, required: [true, "Date is required"] },
}).plugin(autopopulate);

export const Event = model<IEvent>(EVENT_SCHEMA_NAME, EventSchema);