import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/User'

import { env } from '../env'

export const AppDataSource = new DataSource({
  type: env.DBTYPE,
  host: env.DBHOST,
  port: env.DBPORT,
  username: env.DBUSER,
  password: env.DBPASS,
  database: env.DBNAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  ssl: true,
})
