import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/user.model'
import { getAllUsers } from '../services/user.service'

export const getUserController = async (
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

    const userData: any = { ...body, password: hash }

    const result = await User.create(userData)

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
