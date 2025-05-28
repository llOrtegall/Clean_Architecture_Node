import { DB_MYSQL_NAME, DB_MYSQL_PASS, DB_MYSQL_HOST, DB_MYSQL_PORT, DB_MYSQL_USER } from "./envSchema"
import { Sequelize } from "sequelize";

const connectionDb = new Sequelize(DB_MYSQL_NAME, DB_MYSQL_USER, DB_MYSQL_PASS, {
  host: DB_MYSQL_HOST,
  port: DB_MYSQL_PORT,
  dialect: "mysql"
})

export default connectionDb
