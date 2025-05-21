import { DB_MONGO_HOST, DB_MONGO_PORT, DB_MONGO_NAME } from "../schemas/mongo.conn";
import { createConnection } from "mongoose";

export const connectionMongo = async () => {
  try {
    const connection = createConnection(`mongodb://${DB_MONGO_HOST}:${DB_MONGO_PORT}/${DB_MONGO_NAME}`)
    return connection
  } catch (error) {
    console.log(error)
    throw new Error('Error al conectar a la base de datos mongo')
  }
}