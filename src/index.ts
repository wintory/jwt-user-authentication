import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import User, { Address } from './models/user.model'
import userRouter from './routers/user.router'
import db from './services/db'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.use('/api/user', userRouter)

app.listen(PORT, async () => {
  console.log('Connecting to database...')
  await db.connect()
  await User.sync()
  await Address.sync()
  console.log('Connection has been established successfully.')
  console.log(`Server is running on port ${PORT}`)
})
