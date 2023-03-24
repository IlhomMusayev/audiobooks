import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";

class Attempts extends Model {
  public id!: number;
  public code!: string;
  public attempts!: any;
  public isExpired!: boolean;
}

Attempts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    attempts: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "attempts", // name of the table in the database
    sequelize, // instance of Sequelize
  }
);

export default Attempts;
