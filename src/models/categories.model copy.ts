import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";

class Category extends Model {
  public category_id!: number;
  public category_name!: string;
  public category_name_translations!: string;
}

Category.init(
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category_name_translations: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "categories", // name of the table in the database
    sequelize, // instance of Sequelize
  }
);

export default Category;
