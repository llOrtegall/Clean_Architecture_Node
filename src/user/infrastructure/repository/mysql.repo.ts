/**
 * Infraestructura puede conocer a Mysql
 */
import type { UserRepository } from "../../domain/user.repository";
import type { UserEntity } from "../../domain/user.entity";
import { UserModel } from '../model/user.model'

export class MysqlRepository implements UserRepository {

  async registerUser({ uuid, email, name, description }: UserEntity): Promise<UserEntity | null> {
    await UserModel.sync()
    const newUser = await UserModel.create({ uuid, name, email, description })

    if (!newUser) return null

    return newUser
  }

  async findUserById(uuid: string): Promise<UserEntity | null> {
    await UserModel.sync()
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
    await UserModel.sync()
    const listAllUsers = await UserModel.findAll()

    if(!listAllUsers) return null

    return listAllUsers
  }

}