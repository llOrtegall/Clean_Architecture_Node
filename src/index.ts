import express, { urlencoded } from 'express';
import cors from 'cors'

import { routerUser } from './user/infrastructure/routes/user.route'
import { connectionDb } from './user/infrastructure/connections/connection';

const PORT = process.env.PORT ?? 4000
const app = express();

app.disable('x-power-by')
  .use(urlencoded({ extended: false }))
  .use(cors({ origin: '*' }))
  .use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'api route test ok !' })
})

app.use(routerUser)

connectionDb.authenticate()

app.listen(PORT, () => {
  console.log('Server running on: http://localhost:' + PORT);
})