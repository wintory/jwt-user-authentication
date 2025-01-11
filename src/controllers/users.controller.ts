import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { IUser } from '../models/user.model'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserAndPasswordByEmail,
  getUserById,
  updateUser,
  updateUserAddress,
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

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = (await getUserAndPasswordByEmail(email)) as unknown as IUser

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user?.password)

      if (isPasswordMatch) {
        res.status(200).json({
          message: 'Login success',
        })
        return
      }
    }

    res.status(400).json({
      message: 'Login failed',
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Login failed',
    })
  }
}

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body = req.body

    const users = await getUserAndPasswordByEmail(body?.email)

    if (users) {
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

    const user = await getUserById(userId)

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    const result = await updateUser(userId, body)

    if ((body?.addresses || []).length > 0) {
      for (let i = 0; i < body?.addresses.length; i++) {
        const addressData = body?.addresses[i]
        await updateUserAddress(userId, addressData)
      }
    }

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
    const user = await getUserById(userId)

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
