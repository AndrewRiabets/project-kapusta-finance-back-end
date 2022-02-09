import express from 'express'
import tryCatchWrapper from '../helpers/try.wrapper'
import userController from '../controllers/user.controller'
import bankingController from '../controllers/banking.controller'
import {resetBalanceValidation} from '../middleware/user.validation'
import { insertValidation } from '../middleware/banking.validation'

const router = express.Router()

router.patch('/reset-balance', resetBalanceValidation, userController.resetBalance)

router.post('/add-transaction', insertValidation, tryCatchWrapper(bankingController.insert))

router.get('/get-expense', tryCatchWrapper(bankingController.getExpense))

router.get('/get-income', tryCatchWrapper(bankingController.getIncome))

router.get('/get-category', tryCatchWrapper(bankingController.getCategory))

router.delete('/remove-transaction', tryCatchWrapper(bankingController.remove))

export default router
