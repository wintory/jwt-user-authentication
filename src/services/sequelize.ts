import { Sequelize } from 'sequelize'

import dotenv from 'dotenv'
import Models from '../models'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
)

sequelize
  .authenticate()
  .then(async () => {
    await Models.forEach((model) => model.sync({ alter: true }))
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

export default sequelize
