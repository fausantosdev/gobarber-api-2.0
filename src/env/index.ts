import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  APP_KEY: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DBTYPE: z.enum(['postgres', 'mysql']).default('postgres'),
  DBHOST: z.string(),
  DBPORT: z.coerce.number().default(3333),
  DBNAME: z.string(),
  DBUSER: z.string(),
  DBPASS: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error(`x invalid environment variables. ${_env.error.format()}`)
}

export const env = _env.data
