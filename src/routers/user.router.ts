import express from 'express'
import {
  getUserController,
  registerController,
} from '../controllers/users.controller'

const router = express.Router()

router.get('/', getUserController)
router.post('/register', registerController)

export default router
