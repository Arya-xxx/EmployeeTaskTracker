const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userRole: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
      defaultValue: "employee"
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    freezeTableName: true,  // do not pluralize table name
    timestamps: true,       // uses createdAt, updatedAt
    paranoid: true,         // adds deletedAt column
    deletedAt: "deletedAt"
  }
);

module.exports = User;
