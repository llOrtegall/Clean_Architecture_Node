export interface User {
    id?: string;
    name: string;
    email: string;
    documentId: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}