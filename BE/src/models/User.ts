import { model, Schema } from "mongoose";
import { UserRoleEnum, IUser, MongooseHooksEnum } from "@/types";
import { USER_SCHEMA_NAME, USER_FIELDS } from "@/utils";
import bcrypt from "bcrypt";

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

UserSchema.pre(MongooseHooksEnum.SAVE, async function (next) {
  if (!this.isModified(USER_FIELDS.PASSWORD)) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>(USER_SCHEMA_NAME, UserSchema);
