import express from 'express'
import { register, login, deleteUserByUsername } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/user', deleteUserByUsername)

export default router
