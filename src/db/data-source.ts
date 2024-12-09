import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { CreateAppointments1733702092363 } from './migrations/1733702092363-createAppointments'

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
  entities: [],
  migrations: [CreateAppointments1733702092363],
  subscribers: [],
  ssl: true,
})
