'use strict'
import { Model, Sequelize } from 'sequelize'

export default (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {
    static associate() {}
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
    }
  )
  return User
}
