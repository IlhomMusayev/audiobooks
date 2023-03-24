import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";

class User extends Model {
  public id!: number;
  public full_name!: string;
  public phone_number!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "inactive"],
      defaultValue: "inactive",
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user", "moderator"],
      defaultValue: "user",
    },
  },
  {
    tableName: "users", // name of the table in the database
    sequelize, // instance of Sequelize
  }
);

export default User;
