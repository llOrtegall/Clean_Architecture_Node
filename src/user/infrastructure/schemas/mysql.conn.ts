import { z } from "zod";

const envMysqlSchema = z.object({
  DB_MYSQL_USER: z.string().min(4),
  DB_MYSQL_HOST: z.string().url(),
  DB_MYSQL_PASS: z.string().min(2),
  DB_MYSQL_PORT: z.string().min(1).transform(v => parseInt(v, 10)),
  DB_MYSQL_NAME: z.string().min(2)
})

const { success, data, error } = envMysqlSchema.safeParse(process.env)

if (!success) {
  console.error(error.format())
  process.exit(1)
}

export const { 
  DB_MYSQL_NAME,
  DB_MYSQL_PASS,
  DB_MYSQL_PORT,
  DB_MYSQL_USER,
  DB_MYSQL_HOST
} = data