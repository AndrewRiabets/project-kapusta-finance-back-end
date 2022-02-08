import express from 'express'
import userController from '../controllers/user.controller'
import bankingController from '../controllers/banking.controller'
import {setFinanceValidation} from '../middleware/user.validation'


const router = express.Router()

router.patch('/reset-balance', userController.resetBalance)

router.post('/add-transaction', bankingController.insert)

// router.get('/get-transaction',)

// router.delete('/remove-transaction',)

// router.patch('/update-transaction',)

export default router
