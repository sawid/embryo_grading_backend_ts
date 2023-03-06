import { model, Schema } from "mongoose";

interface IUser {
    username: string;
    password: string;
    isVerify: boolean;
  }

const UserSchema = new Schema<IUser>(
  {
    username: String,
    password: String,
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("users", UserSchema);