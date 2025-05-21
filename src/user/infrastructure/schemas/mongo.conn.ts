import { z } from "zod";

const mongoEnvSchema = z.object({
  DB_MONGO_USER: z.string().min(4),
  DB_MONGO_HOST: z.string().min(4),
  DB_MONGO_PASS: z.string().min(2),
  DB_MONGO_PORT: z.string().min(1).transform(v => parseInt(v, 10)),
  DB_MONGO_NAME: z.string().min(2)
})

const { success, data, error } = mongoEnvSchema.safeParse(process.env)

if (!success) {
  console.error(error.format())
  process.exit(1)
}

export const { 
    DB_MONGO_USER,
    DB_MONGO_HOST,
    DB_MONGO_PASS,
    DB_MONGO_PORT,
    DB_MONGO_NAME
} = data

