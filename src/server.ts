import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'
import { AppDataSource } from './db/data-source'
import { uploadConfig } from './lib/upload'
import { AppError } from './errors/AppError'

const app = express()

app.use(
  cors({
    origin: process.env.APPLICATION,
  })
)

app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.directory))

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      })
    }

    response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
)

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
