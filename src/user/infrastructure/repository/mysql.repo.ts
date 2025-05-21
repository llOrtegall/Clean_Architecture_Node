/**
 * Infraestructura puede conocer a Mysql
 */
import type { UserRepository } from "../../domain/user.repository";
import type { UserEntity } from "../../domain/user.entity";
import UserModelMysql from '../model/mysql'
import { ValidationError } from 'sequelize'

export class MysqlRepository implements UserRepository {

  registerUser = async ({ uuid, email, name, description, birthDate, document }: UserEntity): Promise<UserEntity | null> => {
    try {
      await UserModelMysql.sync()
      const newUser = await UserModelMysql.create({ document, uuid, birthDate, name, email, description })
  
      if (!newUser) return null
  
      return newUser
    } catch (error) {
      if(error instanceof ValidationError && error.name === 'SequelizeUniqueConstraintError'){
        throw new Error('El documento, correo o número de telefono ya se encuentran registrados')
      }

      return null
    }
  }

  findUserById = async (uuid: string): Promise<UserEntity | null> => {
    try {
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

    } catch (error) {
      console.log(error)
      return null
    }
  }

  listUsers = async (): Promise<UserEntity[] | null> => {
    try {
      await UserModelMysql.sync()
    const listAllUsers = await UserModelMysql.findAll()

    if (!listAllUsers) return null

    return listAllUsers
    } catch (error) {
      console.log(error)
      return null
    }
  }

}