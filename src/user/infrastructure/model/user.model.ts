import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { connectionDb } from '../connections/connection';

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare uuid?: string
  declare name: string
  declare email: string
  declare description: string | null
}

UserModel.init({
  uuid: { type: DataTypes.STRING(32), primaryKey: true, unique: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true, defaultValue: null }
}, {
  sequelize: connectionDb,
  timestamps: true
})

export { UserModel }