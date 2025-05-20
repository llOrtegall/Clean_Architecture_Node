import { DB_MYSQL_NAME, DB_MYSQL_PASS, DB_MYSQL_HOST, DB_MYSQL_PORT, DB_MYSQL_USER } from "../schemas/mysql.conn"
import { Sequelize } from "sequelize";

export const MysqlConnection = new Sequelize(DB_MYSQL_NAME, DB_MYSQL_USER, {
  host: DB_MYSQL_HOST,
  password: DB_MYSQL_PASS,
  port: DB_MYSQL_PORT,
  dialect: "mysql",
  logging: true
})