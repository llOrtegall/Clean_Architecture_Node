import type { UserEntity } from "@domain/user.entity";
import { model, Schema } from "mongoose";

const userSchema = new Schema<UserEntity>({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  uuid: { type: String, require: true, unique: true },
  document: { type: String, require: true, unique: true },
  birthDate: { type: String, require: true },
  description: { type: String, require: false }
}, {
  timestamps: true
})

export default model<UserEntity>('User', userSchema)