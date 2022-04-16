import { Router } from 'express'
import couriersRouter from "./courier"
import packagesRouter from './package'

const router = Router()

router.use('/couriers', couriersRouter)
router.use('/packages', packagesRouter)

export default router