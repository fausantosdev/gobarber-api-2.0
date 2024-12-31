import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Appointment } from '../entities/appointment'

class AppointmentsRepository extends Repository<Appointment> {
  constructor() {
    super(
      AppDataSource.getRepository(Appointment).target,
      AppDataSource.manager
    )
  }

  async findByDate(date: Date): Promise<Appointment | null> {
    return await AppDataSource.getRepository(Appointment).findOne({
      where: { date },
    })
  }
}

export { AppointmentsRepository }
