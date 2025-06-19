import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER, } from '@infrastructure/configuration/mysqSchema';
import { Sequelize } from 'sequelize';

export const mysqlConn = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: 'mysql',
        timezone: '-05:00'
    }
);