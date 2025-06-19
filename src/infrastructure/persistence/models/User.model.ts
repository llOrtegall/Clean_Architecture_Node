import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize';
import { mysqlConn } from '@infrastructure/persistence/connection';
import { User } from '@/domain/entities/User';

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> implements User {
    declare id: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare documentId: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

UserModel.init({
    id: { type: DataTypes.CHAR(36), primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: mysqlConn,
    tableName: 'USERS',
    timestamps: true
})

export { UserModel };
