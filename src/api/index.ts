import { Router } from 'express'
import indexRouter from "./controllers/index"

const router = Router()

router.use('/', indexRouter)

export default router