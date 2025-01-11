import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import db from '../services/sequelize'

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    // const result = (await db.query(
    //   'SELECT * FROM users WHERE email = ?' + email
    // )) as any
    // const rows = res.json(result.rows) as any

    // console.log({ rows })

    // if (rows.length) {
    //   res.status(400).send({ message: 'Email is already registered' })
    //   return
    // }

    const hash = await bcrypt.hash(password, 10)

    const userData: any = { email, password: hash }

    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      userData
    )
    console.log({ result })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Register failed',
    })
  }
}
