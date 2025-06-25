import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "done"),
    defaultValue: "pending",
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  dueDate: DataTypes.DATE,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Task;
