import type { UserRepository } from "@domain/user.repository";
import { type UserEntity } from '@domain/user.entity';
import { UserValue } from "@domain/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  public registerUser = async ({ name, email, description, birthDate, document, telefono }: Omit<UserEntity, 'uuid'>) => {

    const userValue = new UserValue({ name, email, description, birthDate, document, telefono });

    const userCreated = await this.userRepository.registerUser(userValue);

    return userCreated;
  }

  public getDetailUser = async (uuid: string) => {

    const user = await this.userRepository.findUserById(uuid)
    
    return user
  }

  public listUsers = async () => {
    const users = await this.userRepository.listUsers()
    return users
  }

}