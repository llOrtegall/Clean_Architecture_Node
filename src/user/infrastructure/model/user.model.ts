import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { MysqlConnection } from '../../../connections/Mysql';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare uuid?: string
  declare name: string
  declare email: string
  declare description: string | null
}

User.init({
  uuid: { type: DataTypes.STRING, primaryKey: true, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize: MysqlConnection,
  timestamps: true
})

export { User }