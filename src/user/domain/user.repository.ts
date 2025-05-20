import type { UserEntity } from "./user.entity";

interface User extends Omit<UserEntity, 'uuid'>{}

export interface UserRepository {
  registerUser({ name, email, description }: User): Promise<UserEntity | null>;
  findUserById(uuid: string): Promise<UserEntity | null>;
  listAllUsers(): Promise<UserEntity[] | null>
}