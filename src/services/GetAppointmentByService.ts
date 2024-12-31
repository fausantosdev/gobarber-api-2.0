import { AppointmentsRepository } from '../db/repositories/appointment-repository'
import { Appointment } from '../db/entities/appointment'

class GetAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  async execute(date?: Date): Promise<Appointment[] | Appointment | null> {
    const appointment = date
      ? await this.appointmentsRepository.findByDate(date)
      : this.appointmentsRepository.find()

    return appointment
  }
}

export { GetAppointmentService }
