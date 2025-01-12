import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities/user'

class UserRepository extends Repository<User> {
  constructor() {
    super(AppDataSource.getRepository(User).target, AppDataSource.manager)
  }
}

export { UserRepository }
