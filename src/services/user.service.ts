import { FindOptions } from 'sequelize'
import User, { Address } from '../models/user.model'

export const getAllUsers = async (options: FindOptions<any>) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: { model: Address },
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

export const getUserAndPasswordByEmail = async (email: string) => {
  const users = await User.findOne({
    where: { email },
  })

  return users
}

export const createUser = async (userData: any) => {
  const result = await User.create(userData)

  return result
}

export const updateUser = async (userId: number, userData: any) => {
  const result = await User.update(
    {
      name: userData?.name,
      email: userData?.email,
    },
    { where: { id: userId } }
  )

  return result
}

export const updateUserAddress = async (userId: number, addressData: any) => {
  if (addressData.id) {
    await Address.update(
      {
        address1: addressData.address1,
      },
      {
        where: {
          id: addressData.id,
          userId,
        },
      }
    )
  } else {
    await Address.create({
      ...addressData,
      userId,
    })
  }
}

export const deleteUser = async (userId: number) => {
  const result = await User.destroy({ where: { id: userId } })

  return result
}
