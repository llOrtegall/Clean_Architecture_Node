import type { UserEntity } from "./user.entity";
import { v6 } from 'uuid'

export class UserValue implements UserEntity {
  uuid: string;
  name: string;
  email: string;
  description?: string;

  constructor({ name, email, description }: UserEntity) {
    this.uuid = v6()
    this.email = email
    this.name = name
    this.description = description ?? 'not provide descriptions'
  }
}