import { Router } from 'express'
import couriersRouter from "./courier"

const router = Router()

router.use('/couriers', couriersRouter)

export default router