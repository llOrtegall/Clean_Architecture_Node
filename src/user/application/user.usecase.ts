import type { UserRepository } from "@domain/user.repository";
import { type UserEntity } from '@domain/user.entity';
import { UserValue } from "@domain/user.value";

// UserUseCase CONSUME la interfaz (no la implementa)
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) { }
  // ↑ Recibe una INSTANCIA del repository (inyección de dependencias)

  public createNewUser = async ({ name, email, description, birthDate, document, telefono }: Omit<UserEntity, 'uuid'>) => {
    const userValue = new UserValue({ name, email, description, birthDate, document, telefono });
    const userCreated = await this.userRepository.registerUser(userValue);
    return userCreated;
  }

  public getUserProfile = async (uuid: string) => {
    const user = await this.userRepository.findUserById(uuid);
    return user;
  }

  public getAllUsers = async () => {
    const users = await this.userRepository.listUsers();
    return users;
  }

}