import { model, Schema } from "mongoose";
import { UserRoleEnum, IUser } from "@/types";
import { USER_SCHEMA_NAME } from "@/utils";

export const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>(USER_SCHEMA_NAME, UserSchema);
