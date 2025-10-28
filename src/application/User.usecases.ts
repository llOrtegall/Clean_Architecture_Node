import type { UserRepository } from "@/domain/user/UserRepository";
import { type UserInterface, User } from "@/domain/user/user.entity";
import type { PasswordEncryptor } from "@application/service/PasswordEncrytor"

export class UserUseCases {
  constructor(
    private userRepo: UserRepository,
    private encryptor: PasswordEncryptor
  ) {}

  findAllUsers = async (): Promise<User[]> => {
    const users = await this.userRepo.findAll();
    return users;
  };

  createUser = async ({ name, email, password, documentId }: UserInterface): Promise<User> => {
    
    const hashedPassword = await this.encryptor.hash(password)

    const user = new User(name, email, hashedPassword, documentId);
    const savedUser = await this.userRepo.save(user);
    return savedUser;
  };

  updateUser = async (user: UserInterface): Promise<User> => {
    const updatedUser = await this.userRepo.update(user);
    return updatedUser;
  };

  deleteUser = async (id: string): Promise<void> => {
    await this.userRepo.delete(id);
  };

  findUserById = async (id: string): Promise<User | null> => {
    const user = await this.userRepo.findById(id);
    return user;
  };

  findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userRepo.findByEmail(email);
    return user;
  };
}
