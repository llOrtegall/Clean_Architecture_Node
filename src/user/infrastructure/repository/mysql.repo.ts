/**
 * Infraestructura puede conocer a Mysql
 */
import type { UserRepository } from "../../domain/user.repository";
import type { UserEntity } from "../../domain/user.entity";
import UserModelMysql from '../model/mysql'

export class MysqlRepository implements UserRepository {

  async registerUser({ uuid, email, name, description, birthDate, document }: UserEntity): Promise<UserEntity | null> {
    await UserModelMysql.drop()
    await UserModelMysql.sync()
    const newUser = await UserModelMysql.create({ document, uuid, birthDate, name, email, description })

    if (!newUser) return null

    return newUser
  }

  async findUserById(uuid: string): Promise<UserEntity | null> {
    await UserModelMysql.sync()
    const user = await UserModelMysql.findByPk(uuid)

    if (!user) return null

    const mapUser: UserEntity = {
      uuid: user.dataValues.uuid,
      email: user.dataValues.email,
      document: user.dataValues.document,
      birthDate: user.dataValues.birthDate,
      name: user.dataValues.name,
      description: user.dataValues.description ?? ''
    }

    return mapUser

  }
  async listUsers(): Promise<UserEntity[] | null> {
    await UserModelMysql.sync()
    const listAllUsers = await UserModelMysql.findAll()

    if(!listAllUsers) return null

    return listAllUsers
  }

}