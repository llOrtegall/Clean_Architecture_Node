import { UserRepository } from '@domain/repositories/UserRepository';
import { UserValue }  from '@domain/valueObjects/User.value'
import { User } from '@domain/entities/User';

export class UserUseCases {
    constructor(private userRepo: UserRepository ) {}

    findAllUsers = async (): Promise<User[]> => {
        const users = await this.userRepo.findAll();
        return users;
    }

    createUser = async (name: string, email: string, password: string, documentId: string): Promise<User> => {
        const user = new UserValue(name, email, password, documentId);
        const savedUser = await this.userRepo.save(user);
        return savedUser;
    }

    updateUser = async (user: User): Promise<User> => {
        const updatedUser = await this.userRepo.update(user);
        return updatedUser;
    }

    deleteUser = async (id: string): Promise<void> => {
        await this.userRepo.delete(id);
    }

    findUserById = async (id: string): Promise<User | null> => {
        const user = await this.userRepo.findById(id);
        return user;
    }

    findUserByEmail = async (email: string): Promise<User | null> => {
        const user = await this.userRepo.findByEmail(email);
        return user;
    }

}