import { startOfHour } from 'date-fns'

import { AppointmentsRepository } from '../db/repositories/appointment-repository'
import { Appointment } from '../db/entities/appointment'

type Request = {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentOnTheSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentOnTheSameDate)
      throw Error('This appointment is already booked')

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    }) as Appointment

    await this.appointmentsRepository.save(appointment)

    return appointment
  }
}

export { CreateAppointmentService }
