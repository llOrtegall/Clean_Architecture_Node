import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import type { UserEntity } from '../../../domain/user.entity';
import connection from '../../connections/mysql';

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> implements UserEntity {
  declare uuid?: string;
  declare document: string;
  declare birthDate: string;
  declare name: string;
  declare email: string;
  declare description?: string;
}
UserModel.init({
  uuid: { type: DataTypes.STRING, primaryKey: true, unique: true },
  document: { type: DataTypes.STRING, allowNull: false, unique: true },
  birthDate: { type: DataTypes.DATEONLY, allowNull: false },
  name: { type: DataTypes.STRING(50), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: true }
}, {
  sequelize: connection,
  timestamps: true
})

export default UserModel
