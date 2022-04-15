import { Router } from 'express'
import couriersRouter from "./controllers/courier"

const router = Router()

router.use('/couriers', couriersRouter)

export default router