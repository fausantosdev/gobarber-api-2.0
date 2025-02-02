import { User } from '../db/entities/user'
import { UserRepository } from '../db/repositories/user-repository'
import { AppError } from '../errors/AppError'

type Request = {
  name: string
  email: string
  password: string
}

class CreateAppointmentService {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    })

    if (checkUserExists) throw new AppError('Email address already used')

    const user = this.usersRepository.create({
      name,
      email,
      password,
    })

    const newUser = this.usersRepository.save(user)

    return newUser
  }
}

export default CreateAppointmentService
