import { DB_MONGO_NAME, DB_MONGO_PASS, DB_MONGO_PORT, DB_MONGO_USER, DB_MONGO_HOST } from '../../schemas/mongo.conn';
import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(`mongodb://${DB_MONGO_USER}:${DB_MONGO_PASS}@${DB_MONGO_HOST}:${DB_MONGO_PORT}`)
    console.log(connection.version)
  } catch (error) {
    console.log(error)
  }
}