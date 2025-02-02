import { User } from '../db/entities/user'
import { UserRepository } from '../db/repositories/user-repository'
import { compare } from '../lib/crypt'
import { generateJWT } from '../lib/jwt'
import { AppError } from '../errors/AppError'

type Request = {
  email: string
  password: string
}

type Response = {
  user: User
  token: string
}

class AuthenticateUserService {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOne({
      where: { email },
    })

    if (!user) throw new AppError('Invalid credentials', 401)

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) throw new AppError('Invalid credentials', 401)

    const token = generateJWT({}, String(user.id))

    return { user, token }
  }
}

export default AuthenticateUserService
