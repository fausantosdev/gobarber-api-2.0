import { AppDataSource } from '../data-source'

const AppointmentsRepository = AppDataSource.getRepository('User').extend({
  findByDate(date: Date) {
    return this.createQueryBuilder('appointments')
      .where('appointments.date = :date', { date })
      .getMany()
  },
})

export { AppointmentsRepository }
