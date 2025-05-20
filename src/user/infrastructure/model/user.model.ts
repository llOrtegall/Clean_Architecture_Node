import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { connectionDb } from '../connections/connection';

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare uuid?: string
  declare name: string
  declare email: string
  declare description?: string
}

UserModel.init({
  uuid: { type: DataTypes.STRING, primaryKey: true, unique: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true }
}, {
  sequelize: connectionDb,
  timestamps: true
})

export { UserModel }