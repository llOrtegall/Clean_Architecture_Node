import { MysqlUserRepository } from "@/infrastructure/repositories/MysqlUserRepository";
import { UserController } from "@presentation/controllers/user.controller";
import { UserUseCases } from "@/application/User.usecases";
import { Router } from "express";

const userRouter = Router();

/**
 * Initialize the repository
 */

const userRepoMysql = new MysqlUserRepository();

/**
 * Initialize the use cases
 */
const userUseCases = new UserUseCases(userRepoMysql);

/**
 * Initialize the controller
 */

const userController = new UserController(userUseCases);

/**
 * Define the routes
 */

userRouter.get('/users', userController.findAllUsersCtrl);
userRouter.post('/users', userController.createUserCtrl)
userRouter.delete('/users/:id', userController.deleteUserCtrl);


export { userRouter };
