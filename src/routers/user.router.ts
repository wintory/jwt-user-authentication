import express from 'express'
import {
  deleteUserController,
  getAllUserController,
  getUserController,
  loginController,
  registerController,
  updateUserController,
} from '../controllers/users.controller'
import { checkAuth } from '../middleware/auth.middleware'

const router = express.Router()

router.get('/', checkAuth, getAllUserController)
router.get('/:id', checkAuth, getUserController)
router.put('/:id', checkAuth, updateUserController)
router.delete('/:id', checkAuth, deleteUserController)

router.post('/login', loginController)
router.post('/register', registerController)

export default router
