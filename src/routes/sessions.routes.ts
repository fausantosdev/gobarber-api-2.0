import { Router } from 'express'

const routes = Router()

import { UserRepository } from '../db/repositories/user-repository'
import AuthenticateUserService from '../services/authenticate-user-service'

const usersRepository = new UserRepository()

routes.post('/sign-in', async (request, response): Promise<any> => {
  const authenticateUserService = new AuthenticateUserService(usersRepository)

  const { email, password } = request.body

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  })

  const { name, email: mail, avatar } = user

  return response.json({
    user: {
      name,
      email: mail,
      avatar,
    },
    token,
  })
})

export default routes
