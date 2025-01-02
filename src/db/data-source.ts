import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { env } from '../env'

import { CreateAppointments1733702092363 } from './migrations/1733702092363-createAppointments'
import { CreateUsers1735777447614 } from './migrations/1735777447614-createUsers'

import { Appointment } from './entities/appointment'
import { User } from './entities/user'

export const AppDataSource = new DataSource({
  type: env.DBTYPE,
  host: env.DBHOST,
  port: env.DBPORT,
  username: env.DBUSER,
  password: env.DBPASS,
  database: env.DBNAME,
  synchronize: true,
  logging: false,
  entities: [Appointment, User],
  migrations: [CreateAppointments1733702092363, CreateUsers1735777447614],
  subscribers: [],
  ssl: true,
})
