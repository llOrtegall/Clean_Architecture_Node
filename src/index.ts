import express, { urlencoded } from 'express';
import cors from 'cors'

const PORT = process.env.PORT ?? 4000
const app = express();

app.disable('x-power-by')
  .use(urlencoded({ extended: false }))
  .use(cors({ origin: '*' }))
  .use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'api route test ok !' })
})

app.listen(PORT, () => {
  console.log('Server running on: http://localhost:' + PORT);
})