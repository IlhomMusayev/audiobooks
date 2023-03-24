import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";

class Sessions extends Model {
  public id!: number;
  public useragent!: string;
}

Sessions.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    useragent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "sessions", // name of the table in the database
    sequelize, // instance of Sequelize
  }
);

export default Sessions;
