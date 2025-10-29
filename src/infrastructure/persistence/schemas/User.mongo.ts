//import type { UserInterface } from "@/domain/user/user.entity";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: { type: String, require: false },
    name: { type: String },
    email: { type: String, require: true, unique: true },
    documentId: { type: String, require: true, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model("Users", UserSchema);
