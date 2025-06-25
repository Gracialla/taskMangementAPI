import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define('User', {
  name: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: { type:DataTypes.STRING, allowNull: false},
  phone: { type:DataTypes.STRING, allowNull: true},
  resetToken: DataTypes.STRING,
  resetTokenExpires: DataTypes.DATE
}, { timestamps: true });

export default User;