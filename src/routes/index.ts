import { Router } from 'express'

import appointmentsRouter from './appointments.routes'
import userRoutes from './users.routes'
import sessionRoutes from './sessions.routes'

const routes = Router()

routes.use('/session', sessionRoutes)
routes.use('/appointments', appointmentsRouter)
routes.use('/users', userRoutes)

export default routes
