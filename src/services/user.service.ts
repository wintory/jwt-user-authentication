import { FindOptions } from 'sequelize'
import User, { Address } from '../models/user.model'

export const getAllUsers = async (options: FindOptions<any>) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    ...options,
  })

  return users
}

export const getUserById = async (userId: number) => {
  const users = await User.findAll({
    where: { id: userId },
    attributes: { exclude: ['password'] },
  })

  return users
}

export const createUser = async (userData: any) => {
  const result = await User.create(userData)

  return result
}

export const getUserAddress = async (userId: number) => {
  const userAddress = await User.findAll({
    where: { id: userId },
    include: { model: Address },
    attributes: { exclude: ['password'] },
  })

  return userAddress
}
