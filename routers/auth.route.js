import express from 'express'
import userController from '../controllers/user.controller'
import {authValidation} from '../middleware/auth.validation'
import guard from '../middleware/guard'

const router = express.Router()

router.post('/registration', authValidation, userController.registration)

router.post('/login', userController.login)

router.post('/logout', guard, userController.logout)

router.get('/refresh', userController.refresh)

router.get('/users', userController.getUsers)

router.get('/google', userController.googleAuth)

router.get('/google-redirect', userController.googleRedirect)



export default router
