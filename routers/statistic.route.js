import express from 'express'
import tryCatchWrapper from '../helpers/try.wrapper'
import statisticController from '../controllers/statistic.controller'

const router = express.Router()

router.get('/summary', tryCatchWrapper(statisticController.summary))



export default router
