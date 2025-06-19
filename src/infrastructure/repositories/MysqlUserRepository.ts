import { UserModel } from '@infrastructure/persistence/models/User.model';
import { UserRepository } from '@domain/repositories/UserRepository';
import { User } from '@domain/entities/User';
import { UserValue } from '@/domain/valueObjects/User.value';

export class MysqlUserRepository implements UserRepository {

    findAll = async (): Promise<User[]> => {
        try {
            await UserModel.sync(); // valida que la table en la db se encuentre creada y sincronizada

            const users = await UserModel.findAll()

            if(!users || users.length === 0) return []

            // esto podria separarse en un dto o mapper para transformar los datos
            // pero por simplicidad se hace aqui
            const usersEntity: User[] = users.map( u => ({
                id: u.dataValues.id,
                name: u.dataValues.name,
                email: u.dataValues.email,
                documentId: u.dataValues.documentId,
                password: u.dataValues.password,
                createdAt: u.dataValues.createdAt,
                updatedAt: u.dataValues.updatedAt
            }))

            return usersEntity;
        } catch (error) {
            console.error('Error fetching users from MySQL:', error);
            throw new Error('Error fetching users from MySQL');
        }
    }

    save = async (user: User): Promise<User> => {
        try {
            const userEntity = new UserValue(
                user.name,
                user.email,
                user.password,
                user.documentId
            )

            const newUser = await UserModel.create(userEntity)

            const savedUser: User = {
                id: newUser.dataValues.id,
                name: newUser.dataValues.name,
                email: newUser.dataValues.email,
                documentId: newUser.dataValues.documentId,
                password: newUser.dataValues.password,
                createdAt: newUser.dataValues.createdAt,
                updatedAt: newUser.dataValues.updatedAt
            }

            return savedUser;
        } catch (error) {
            console.error('Error saving user to MySQL:', error);
            throw new Error('Error saving user to MySQL');
        }
    }

    update(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    findById(id: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }

    findByEmail(email: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    
}