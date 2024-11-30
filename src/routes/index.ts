import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response): any => {
  return response.json({ message: 'Hello World' })
})

export default routes
