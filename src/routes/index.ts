import { Router } from 'express'

import appointmentsRouter from './appointments.routes'
import userRoutes from './users.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', userRoutes)

export default routes
