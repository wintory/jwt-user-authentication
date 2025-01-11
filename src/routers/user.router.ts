import express from 'express'
import {
  deleteUserController,
  getAllUserController,
  getUserController,
  loginController,
  registerController,
  updateUserController,
} from '../controllers/users.controller'

const router = express.Router()

router.get('/', getAllUserController)
router.get('/:id', getUserController)
router.put('/:id', updateUserController)
router.delete('/:id', deleteUserController)

router.post('/login', loginController)
router.post('/register', registerController)

export default router
