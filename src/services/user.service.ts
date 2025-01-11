import { FindOptions } from 'sequelize'
import User from '../models/user.model'

export const getAllUsers = async (options: FindOptions<any>) => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'password'] },
    ...options,
  })

  return users
}

export const createUser = async (userData: any) => {
  const result = await User.create(userData)

  return result
}
