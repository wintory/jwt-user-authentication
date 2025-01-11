import express from 'express'
import {
  getAllUserController,
  getUserAddressController,
  getUserController,
  registerController,
} from '../controllers/users.controller'

const router = express.Router()

router.get('/', getAllUserController)
router.get('/:id', getUserController)
router.get('/address/:id', getUserAddressController)
router.post('/register', registerController)

export default router
