import { User, type UserInterface } from "@/domain/user/user.entity";
import type { UserRepository } from "@domain/user/UserRepository";
import { UserModel } from "../persistence/schemas/User.mongo";

export class MongoRepository implements UserRepository {
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  save = async ({
    name,
    email,
    password,
    documentId,
  }: UserInterface): Promise<User> => {
    try {
      const newUserEntity = new User(name, email, password, documentId);
      const newUser = new UserModel(newUserEntity);
      await newUser.save();

      const savedUser: User = {
        id: newUser.id,
        name: newUser.name || "",
        email: newUser.email || "",
        documentId: newUser.documentId || "",
        password: newUser.password || "",
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };

      return savedUser;
    } catch (error) {
      console.error(error);
      throw new Error("Error saving user to MongoDB");
    }
  };
  update(user: UserInterface): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
