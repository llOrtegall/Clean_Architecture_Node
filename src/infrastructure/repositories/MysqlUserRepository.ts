import { UserModel } from "@infrastructure/persistence/models/User.model";
import type { UserRepository } from "@/domain/user/UserRepository";
import { type UserInterface, User } from "@/domain/user/user.entity";

export class MysqlUserRepository implements UserRepository {
  findAll = async (): Promise<User[]> => {
    try {
      await UserModel.sync(); // valida que la table en la db se encuentre creada y sincronizada

      const users = await UserModel.findAll();

      if (!users || users.length === 0) return [];

      // esto podria separarse en un dto o mapper para transformar los datos
      // pero por simplicidad se hace aqui
      const usersEntity: User[] = users.map((u) => ({
        id: u.dataValues.id,
        name: u.dataValues.name,
        email: u.dataValues.email,
        documentId: u.dataValues.documentId,
        password: u.dataValues.password,
        createdAt: u.dataValues.createdAt,
        updatedAt: u.dataValues.updatedAt,
      }));

      return usersEntity;
    } catch (error) {
      console.error("Error fetching users from MySQL:", error);
      throw new Error("Error fetching users from MySQL");
    }
  };

  save = async ({
    name,
    email,
    password,
    documentId,
  }: UserInterface): Promise<User> => {
    try {
      await UserModel.sync(); // valida que la table en la db se encuentre creada y sincronizada

      const newUserEntity = new User(name, email, password, documentId);

      const newUser = await UserModel.create(newUserEntity);

      const savedUser: User = {
        id: newUser.dataValues.id,
        name: newUser.dataValues.name,
        email: newUser.dataValues.email,
        documentId: newUser.dataValues.documentId,
        password: newUser.dataValues.password,
        createdAt: newUser.dataValues.createdAt,
        updatedAt: newUser.dataValues.updatedAt,
      };

      return savedUser;
    } catch (error) {
      console.error("Error saving user to MySQL:", error);
      throw new Error("Error saving user to MySQL");
    }
  };

  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  delete = async (id: string): Promise<void> => {
    try {
      await UserModel.destroy({ where: { id } });
    } catch (error) {
      console.error("Error deleting user from MySQL:", error);
      throw new Error("Error deleting user from MySQL");
    }
  };

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
