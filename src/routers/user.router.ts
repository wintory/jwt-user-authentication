import express from 'express'
import {
  getAllUserController,
  getUserController,
  registerController,
  updateUserController,
} from '../controllers/users.controller'

const router = express.Router()

router.get('/', getAllUserController)
router.get('/:id', getUserController)
router.post('/', registerController)
router.put('/:id', updateUserController)

export default router
