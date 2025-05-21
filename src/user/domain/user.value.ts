import type { UserEntity } from "./user.entity";
import { v6 } from 'uuid'

export class UserValue implements UserEntity {
  uuid: string;
  name: string;
  email: string;
  birthDate: string;
  document: string;
  description?: string

  constructor({ name, email, description, birthDate, document }: UserEntity) {
    this.uuid = v6()
    this.document = document
    this.birthDate = birthDate
    this.email = email
    this.name = name
    this.description = description ?? 'not provide descriptions'
  }
}