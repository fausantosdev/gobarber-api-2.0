import { Router } from 'express'

const routes = Router()

routes.post('/', async (request, response): any => {
  try {
    return response.send()
  } catch (error: any) {
    return response.status(400).json({ error: error.message })
  }
})

export default routes
