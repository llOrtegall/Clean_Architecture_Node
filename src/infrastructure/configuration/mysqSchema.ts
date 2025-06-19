import { z } from 'zod'

const mysqlSchemaEnvironments = z.object({
  MYSQL_HOST: z.string().min(1, 'MYSQL_HOST is required'),
  MYSQL_PORT: z.string().min(1, 'MYSQL_PORT is required').transform((val: string) => parseInt(val, 10)),
  MYSQL_USER: z.string().min(1, 'MYSQL_USER is required'),
  MYSQL_PASSWORD: z.string().min(1, 'MYSQL_PASSWORD is required'),
  MYSQL_DATABASE: z.string().min(1, 'MYSQL_DATABASE is required'),
});

const { success, data, error } = mysqlSchemaEnvironments.safeParse(process.env);

if (!success) {
  console.error('Invalid MySQL environment variables:', error.errors);
  process.exit(1);
}

export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = data