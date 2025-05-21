import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors'

import { connectMongo } from './user/infrastructure/connections/mongo';
import { routerUser } from './user/infrastructure/routes/user.route';
import connMySqlDb from './user/infrastructure/connections/mysql';

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

connMySqlDb.authenticate();
connectMongo();

app.listen(PORT, () => {
  console.log('Server running on: http://localhost:' + PORT);
})