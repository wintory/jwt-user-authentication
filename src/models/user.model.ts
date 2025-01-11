import { DataTypes } from 'sequelize'
import sequelize from '../services/sequelize'

const User = sequelize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
)

const Address = sequelize.define(
  'addresses',
  {
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
)

User.hasMany(Address, { onDelete: 'CASCADE', hooks: true })

Address.belongsTo(User)

export default User
