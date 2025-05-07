import { model, Schema } from "mongoose";
import { UserRoleEnum, IUser, MongooseHooksEnum } from "@/types";
import { USER_SCHEMA_NAME, USER_FIELDS } from "@/utils";
import bcrypt from "bcrypt";

export const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already exists"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: {
        values: Object.values(UserRoleEnum),
        message: "Invalid role",
      },
      default: UserRoleEnum.USER,
      required: [true, "Role is required"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre(MongooseHooksEnum.SAVE, async function (next) {
  if (!this.isModified(USER_FIELDS.PASSWORD)) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model<IUser>(USER_SCHEMA_NAME, UserSchema);
