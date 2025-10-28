import type { UserInterface, User } from "@/domain/user/user.entity";

export interface UserRepository {
  findAll(): Promise<User[]>;
  save(user: UserInterface): Promise<User>;
  update(user: UserInterface): Promise<User>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
