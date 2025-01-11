import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/user.model'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../services/user.service'

export const getAllUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers({})
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Failed to get users',
    })
  }
}

export const getUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = +req.params.id
    const users = await getUserById(userId)
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Failed to get users',
    })
  }
}

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body = req.body

    const users = await User.findAll({ where: { email: body?.email } })

    if (users.length > 0) {
      res.status(400).send({ message: 'Email is already registered' })
      return
    }

    const hash = await bcrypt.hash(body?.password, 10)

    const userData = { ...body, password: hash }

    const result = await createUser(userData)

    if (result) {
      res.status(200).json({
        message: 'Register success',
      })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Register failed',
    })
  }
}

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = +req.params.id
    const body = req.body

    const user = await User.findAll({ where: { id: userId } })

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    const result = await updateUser(userId, body)

    if (result) {
      res.status(200).json({
        message: 'Update success',
      })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Update failed',
    })
  }
}

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = +req.params.id
    const user = await User.findAll({ where: { id: userId } })

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    const result = await deleteUser(userId)

    if (result) {
      res.status(200).json({
        message: 'Delete success',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Delete failed',
    })
  }
}
