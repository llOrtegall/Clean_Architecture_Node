import { UserUseCase } from "../../application/user.usecase";
import { UserController } from "../controller/user.controller";
import { MysqlRepository } from "../repository/mysql.repo";
import { Router } from "express";

const routerUser = Router()

/**
 * Iniciar el repository
 */
const MysqlUserRepository = new MysqlRepository()

/**
 * Iniciamos casos de use
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
routerUser.get('/user', userCtrl.getController)

export { routerUser }