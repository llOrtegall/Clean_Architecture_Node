import { UserUseCases } from '@application/User.usecases';
import { Request, Response } from 'express';

export class UserController {
    constructor(private userUseCases: UserUseCases) {}

    public findAllUsersCtrl = async (_req: Request, res: Response) => {
        try {
            const users = await this.userUseCases.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public createUserCtrl = async (req: Request, res: Response) => {
        const { name, email, password, documentId } = req.body;

        try {
            const newUser = await this.userUseCases.createUser(name, email, password, documentId);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public deleteUserCtrl = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.userUseCases.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}