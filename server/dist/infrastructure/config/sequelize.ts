import { BlockComponent } from "@infrastructure/models/blockComponentModel";
import { Block } from "@infrastructure/models/blockModel";
import CardToBlock from "@infrastructure/models/cardToblockModel";
import { Color } from "@infrastructure/models/colorModel";
import { Component } from "@infrastructure/models/componentModel";
import { Language } from "@infrastructure/models/languageModel";
import { PageCard } from "@infrastructure/models/pageCardModel";
import { Page } from "@infrastructure/models/pageModel";
import { SiteData } from "@infrastructure/models/siteDataModel";
import { UserToColor } from "@infrastructure/models/userToColorModel";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { WebsiteToColor } from "@infrastructure/models/websiteToColor";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { Sequelize } from "sequelize-typescript";

// Подключение к базе данных
const sequelize = new Sequelize({
  repositoryMode: true,
  database: "railway",
  host: "roundhouse.proxy.rlwy.net",
  username: "postgres",
  password: "mhbFORGazRVTshFNNCtOeHgauiDBvdOO",
  port: 17737,
  // database: process.env.DB_NAME,
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // port: 5432,
  dialect: "postgres",
  storage: ":memory:",
  logging: false,
  models: [
    User,
    Website,
    Page,
    UserToWebsite,
    Component,
    Block,
    PageCard,
    CardToBlock,
    BlockComponent,
    SiteData,
    Color,
    UserToColor,
    WebsiteToColor,
    Language,
  ],
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
