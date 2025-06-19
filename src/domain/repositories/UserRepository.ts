import { User } from '@domain/entities/User';

export interface UserRepository {
    findAll(): Promise<User[]>;
    save(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;

    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}