import type { UserRepository } from "../domain/user.repository";
import { type UserEntity } from '../domain/user.entity';
import { UserValue } from "../domain/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {

  }

  public async registerUser({ name, email, description }: Omit<UserEntity, 'uuid'>) {
    const userValue = new UserValue({ name, email, description });
    const userCreated = await this.userRepository.registerUser(userValue)
    return userCreated
  }

  public async getDetailUser(uuid: string) {
    const user = await this.userRepository.findUserById(uuid)
    return user
   }

}