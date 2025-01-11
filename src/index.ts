import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import userRouter from './routers/user.router'
import db from './services/db'
import sequelize from './services/sequelize'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:${process.env.PORT}`],
  })
)
app.use(cookieParser())
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
)

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.use('/api/user', userRouter)

app.listen(PORT, async () => {
  console.log('Connecting to database...')
  await db.connect()
  await sequelize.sync()
  console.log('Connection has been established successfully.')
  console.log(`Server is running on port ${PORT}`)
})
