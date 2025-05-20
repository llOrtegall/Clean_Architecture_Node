/**
 * Infra! puede conocer a Mysql
 */
import type { UserRepository } from "../../domain/user.repository";
import type { UserEntity } from "../../domain/user.entity";
import { UserModel } from '../model/user.model'

export class MysqlRepository implements UserRepository {

  async registerUser({ email, name, description }: UserEntity): Promise<UserEntity | null> {
    const newUser = await UserModel.create({ name, email, description })

    if (!newUser) return null

    return newUser
  }

  async findUserById(uuid: string): Promise<UserEntity | null> {
    const user = await UserModel.findByPk(uuid)

    if (!user) return null

    const mapUser: UserEntity = {
      uuid: user.dataValues.uuid,
      email: user.dataValues.email,
      name: user.dataValues.name,
      description: user.dataValues.description ?? ''
    }

    return mapUser

  }
  async listUsers(): Promise<UserEntity[] | null> {
    const listAllUsers = UserModel.findAll()

    if(!listAllUsers) return null

    return listAllUsers
  }

}