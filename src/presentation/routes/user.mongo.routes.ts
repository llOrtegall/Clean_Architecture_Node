// import { MysqlUserRepository } from "@/infrastructure/repositories/MysqlUserRepository";
import { MongoRepository } from "@infrastructure/repositories/MongoDBUserRepository";
import { BcryptPasswordEncryptor } from "@infrastructure/security/BcryptPassEncryptor";
import { UserController } from "@presentation/controllers/user.controller";
import { UserUseCases } from "@/application/User.usecases";
import { Router } from "express";

const userMongoRoute = Router();

/**
 * Initialize the repository
 */

// const userRepoMysql = new MysqlUserRepository();
const userMonogoRepo = new MongoRepository();

/**
 * Initialize the use cases
 */
const userUseCases = new UserUseCases(
  userMonogoRepo,
  new BcryptPasswordEncryptor(),
);

/**
 * Initialize the controller
 */

const userController = new UserController(userUseCases);

/**
 * Define the routes
 */

userMongoRoute.get("/m1/users", userController.findAllUsersCtrl);
userMongoRoute.post("/m1/users", userController.createUserCtrl);
userMongoRoute.delete("/m1/users/:id", userController.deleteUserCtrl);

export { userMongoRoute };
