import { Router } from 'express'

import { hash } from '../lib/crypt'

import { UserRepository } from '../db/repositories/user-repository'
import CreateUserService from '../services/create-user-service'

const routes = Router()

const usersRepository = new UserRepository()

routes.post('/', async (request, response): any => {
  const createUserService = new CreateUserService(usersRepository)

  try {
    const { name, email, password } = request.body

    const hashedPassword = await hash(password, 8)

    const user = await createUserService.execute({
      name,
      email,
      password: hashedPassword,
    })

    delete user.password

    return response.json(user)
  } catch (error: any) {
    return response.status(400).json({ error: error.message })
  }
})

export default routes
