import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token

    if (!token) {
      res.status(401).json({
        message: 'Unauthorized',
      })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '')

    if (!decoded) {
      res.status(401).json({
        message: 'Unauthorized',
      })
      return
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
