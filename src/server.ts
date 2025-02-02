import express from 'express'
import routes from './routes'

import { AppDataSource } from './db/data-source'
import { uploadConfig } from './lib/upload'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.directory))

AppDataSource.initialize()
  .then(() => {
    console.log('~ database conection has been initialized')

    app.listen(3333, () => {
      console.log(`~ server running`)
    })
  })
  .catch((err) => {
    console.error('x error during database initialization', err)
  })
