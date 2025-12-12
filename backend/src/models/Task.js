const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    taskStatus: {
      type: DataTypes.ENUM("pending", "inProgress", "completed"),
      defaultValue: "pending",
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt"
  }
);

// Associations
Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignedUser" });
User.hasMany(Task, { foreignKey: "assignedTo", as: "tasks" });

module.exports = Task;
