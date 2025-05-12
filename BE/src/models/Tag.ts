import { Schema, model } from "mongoose";
import { ITag } from "@/types";
import { TAG_SCHEMA_NAME } from "@/utils/constants";

export const TagSchema = new Schema<ITag>({
    name: {
        en: {
            type: String,
            required: [true, "English name is required"],
            minlength: [3, "English name must be at least 3 characters long"],
            maxlength: [10, "English name must be less than 10 characters"],
        },
        ar: {
            type: String,
            required: [true, "Arabic name is required"],
            minlength: [3, "Arabic name must be at least 3 characters long"],
            maxlength: [10, "Arabic name must be less than 10 characters"],
        }
    },
    color: {
        type: String,
        required: [true, "Color is required"],
    },
});

export const Tag = model<ITag>(TAG_SCHEMA_NAME, TagSchema);
