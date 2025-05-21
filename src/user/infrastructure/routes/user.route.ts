import { UserController } from "../controller/user.controller";
import { UserUseCase } from "../../application/user.usecase";
import { MysqlRepository } from "../repository/mysql.repo";
import { MongoRepository } from "../repository/mongo.repo";
import { Router } from "express";

const routerUser = Router()

/**
 * Iniciar el repository
 */

const MysqlUserRepository = new MysqlRepository()
// const MysqlUserRepository = new MongoRepository()

/**
 * Iniciamos casos de uso
 */
const userUseCase = new UserUseCase(MysqlUserRepository)
/**
 * Iniciamos User Controller
 */
const userCtrl = new UserController(userUseCase)
/**
 * definir rutas
 */
routerUser.post('/user', userCtrl.insertController)
routerUser.get('/user/:uuid', userCtrl.getController)
routerUser.get('/users', userCtrl.listController)

export { routerUser }