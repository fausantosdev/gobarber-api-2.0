import { parseISO } from 'date-fns'
import { Router } from 'express'

import { CreateAppointmentService } from '../services/CreateAppointmentService'
import { GetAppointmentService } from '../services/GetAppointmentByService'
import { AppointmentsRepository } from '../db/repositories/appointment-repository'

const routes = Router()

routes.post('/appointments', async (request, response): any => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const appointmentsRepository = new AppointmentsRepository()
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    )

    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate,
    })

    return response.json(appointment)
  } catch (error: any) {
    return response.status(400).json({ error: error.message })
  }
})

routes.get('/appointments', async (request, response): any => {
  const date = request.body.date ?? null

  try {
    const appointmentsRepository = new AppointmentsRepository()
    const getAppointmentByDateService = new GetAppointmentService(
      appointmentsRepository
    )

    const appointment = await getAppointmentByDateService.execute(date)

    return response.json(appointment)
  } catch (error: any) {
    return response.status(400).json({ error: error.message })
  }
})

export default routes
