import express from 'express'
import tryCatchWrapper from '../helpers/try.wrapper'
import statisticController from '../controllers/statistic.controller'
import { summaryValidation } from '../middleware/statistic.validation'

const router = express.Router()

router.get('/summary', summaryValidation, tryCatchWrapper(statisticController.summary))

router.get('/category-grouping/profit/:date', tryCatchWrapper(statisticController.groupProfitByCategory))

router.get('/category-grouping/costs/:date',tryCatchWrapper(statisticController.groupCostsByCategory))

router.get('/items-grouping/:categoryId', tryCatchWrapper(statisticController))

export default router
