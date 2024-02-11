import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "SPARK_ADMIN",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);

export default sequelize;
