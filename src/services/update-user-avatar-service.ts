import path from 'node:path'
import fs from 'node:fs'

import { UserRepository } from '../db/repositories/user-repository'
import { User } from '../db/entities/user'
import { uploadConfig } from '../lib/upload'
import { AppError } from '../errors/AppError'

type Request = {
  user_id: string
  avatar_filename: string
}

class UpdateUserAvatarService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ user_id, avatar_filename }: Request): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: user_id } })

    if (!user)
      throw new AppError('Only authenticated users can change avatar', 401)

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatar_filename

    await this.usersRepository.save(user)

    return user
  }
}

export { UpdateUserAvatarService }
