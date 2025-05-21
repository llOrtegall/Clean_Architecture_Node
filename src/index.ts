import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors'

import { connectionMongo } from './user/infrastructure/connections/connection.mongo';
import { connectionDb } from './user/infrastructure/connections/connection';
import { routerUser } from './user/infrastructure/routes/user.route'

const PORT = process.env.PORT ?? 4000
const app = express();

app.disable('x-power-by')
  .use(urlencoded({ extended: false }))
  .use(cors({ origin: '*' }))
  .use(morgan('dev'))
  .use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'api route test ok !' })
})

app.use(routerUser)

connectionDb.authenticate()

connectionMongo()
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error))

app.listen(PORT, () => {
  console.log('Server running on: http://localhost:' + PORT);
})