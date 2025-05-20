import type { UserEntity } from "./user.entity";

export interface UserRepository {
  registerUser(user: UserEntity): Promise<UserEntity | null>;
  findUserById(uuid: string): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[] | null>
}