import { Router } from 'express'

const routes = Router()

import { UserRepository } from '../db/repositories/user-repository'
import AuthenticateUserService from '../services/authenticate-user-service'

const usersRepository = new UserRepository()

routes.post('/sign-in', async (request, response): any => {
  const authenticateUserService = new AuthenticateUserService(usersRepository)

  try {
    const { email, password } = request.body

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })

    delete user.password

    return response.json({ user, token })
  } catch (error: any) {
    return response.status(400).json({ error: error.message })
  }
})

export default routes
