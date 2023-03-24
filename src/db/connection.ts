import config from "config";
import { Sequelize } from "sequelize";

const PSQL_URL: string = config.get("psql_uri");

const sequelize = new Sequelize(PSQL_URL, {
  logging: false,
});

export default sequelize;
