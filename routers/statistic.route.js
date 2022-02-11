import express from 'express'
import tryCatchWrapper from '../helpers/try.wrapper'
import statisticController from '../controllers/statistic.controller'
import { summaryValidation } from '../middleware/statistic.validation'

const router = express.Router()

router.get('/summary', summaryValidation, tryCatchWrapper(statisticController.summary))

router.get('/category-grouping', tryCatchWrapper(statisticController))

router.get('/items-grouping/:categoryId', tryCatchWrapper(statisticController))

export default router
