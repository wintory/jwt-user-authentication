import jwt from 'jsonwebtoken'

export const generateJWTToken = (
  email: string,
  secret: string,
  expiresIn = '1h'
) => {
  return jwt.sign({ email, role: 'admin' }, secret, { expiresIn })
}
