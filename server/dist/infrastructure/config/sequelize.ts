import { Page } from "infrastructure/models/pageModel";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  repositoryMode: true,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "postgres",
  storage: ":memory:",
  port: 5432,
  logging: false,
  models: [User, Page, Website],
});

export default sequelize;

sequelize.addModels([User, Page, Website]);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
