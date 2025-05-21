/**
 * Infraestructura puede conocer a MongoDB
 */
import type { UserRepository } from "@domain/user.repository";
import type { UserEntity } from "@domain/user.entity";
import UserModelMongo from '@infrastructure/model/mongo'

export class MongoRepository implements UserRepository {

  async registerUser(user: UserEntity): Promise<UserEntity | null> {
    const newUser = await UserModelMongo.insertOne(user)

    if (!newUser) return null

    return newUser
  }

  async findUserById(uuid: string): Promise<UserEntity | null> {
    const user = await UserModelMongo.findOne({ uuid })

    if (!user) return null

    return user
  }

  async listUsers(): Promise<UserEntity[] | null> {
    const listAllUsers = await UserModelMongo.find()

    if (!listAllUsers) return null

    return listAllUsers
  }
}