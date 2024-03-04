import { User } from "@models/userModel";
import { Website } from "@models/websiteModel";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  repositoryMode: true,
  database: "railway",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "postgres",
  storage: ":memory:",
  port: 54356,
  logging: false,
  models: [User, Website],
}); 

export default sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
