import { Page } from "@infrastructure/models/pageModel";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  repositoryMode: true,
  database: "railway",
  host: "roundhouse.proxy.rlwy.net",
  username: "postgres",
  password: "LISSmoVkwMDbQcKjPAZgBJFYIVEmxJwh",
  dialect: "postgres",
  storage: ":memory:",
  port: 30830,
  // database: process.env.DB_NAME,
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // port: 5432,
  logging: false,
  models: [User, Website, Page],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
