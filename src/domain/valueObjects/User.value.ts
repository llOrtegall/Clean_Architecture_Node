import { User } from '@domain/entities/User';
import { v4 as uuidv4 } from 'uuid';

export class UserValue implements User {
    id: string;

    name: string;
    email: string;
    password: string;
    documentId: string;

    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    constructor(name: string, email: string, password: string, documentId: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = uuidv4();
        this.documentId = documentId;
    }

}