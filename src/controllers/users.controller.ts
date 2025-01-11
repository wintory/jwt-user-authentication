import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/user.model'

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    let result = await User.console.log({ result })

    // const rows = res.json(result.rows) as any

    // if (rows.length) {
    //   res.status(400).send({ message: 'Email is already registered' })
    //   return
    // }

    const hash = await bcrypt.hash(password, 10)

    const userData: any = [email, hash]
    console.log({ userData })

    // const result = await db.query(
    //   'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    //   userData
    // )
    // console.log({ result })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Register failed',
    })
  }
}
