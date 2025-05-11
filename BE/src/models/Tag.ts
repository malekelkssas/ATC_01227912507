import { Schema, model } from "mongoose";
import { ITag } from "@/types";
import { TAG_SCHEMA_NAME } from "@/utils/constants";

export const TagSchema = new Schema<ITag>({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 5 characters long"],
        maxlength: [10, "Name must be less than 10 characters"],
        unique: [true, "Name must be unique"],
    },
    color: {
        type: String,
        required: [true, "Color is required"],
    },
});

export const Tag = model<ITag>(TAG_SCHEMA_NAME, TagSchema);
