import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { env } from '../env'

import { CreateAppointments1733702092363 } from './migrations/1733702092363-createAppointments'
import { CreateUsers1735777447614 } from './migrations/1735777447614-createUsers'
import { AlterProviderFieldToProviderId1736182209894 } from './migrations/1736182209894-alterProviderFieldToProviderId'
import { AddAvatarFieldsToUsers1736817858728 } from './migrations/1736817858728-addAvatarFieldsToUsers'

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
  migrations: [
    CreateAppointments1733702092363,
    CreateUsers1735777447614,
    AlterProviderFieldToProviderId1736182209894,
    AddAvatarFieldsToUsers1736817858728,
  ],
  subscribers: [],
  ssl: true,
})
