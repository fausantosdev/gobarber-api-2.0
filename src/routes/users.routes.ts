import { Router } from 'express'
import multer from 'multer'

import { hash } from '../lib/crypt'
import { uploadConfig } from '../lib/upload'

import ensureAuthenticated from '../middlewares/ensure-authenticated'

import { UserRepository } from '../db/repositories/user-repository'
import CreateUserService from '../services/create-user-service'
import { UpdateUserAvatarService } from '../services/update-user-avatar-service'

const routes = Router()

const usersRepository = new UserRepository()

const upload = multer(uploadConfig)

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

routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response): any => {
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository)

    try {
      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatar_filename: request.file!.filename,
      })

      delete user.password

      return response.json(user)
    } catch (error: any) {
      return response.status(error.statusCode).json({ error: error.message })
    }
  }
)

export default routes
