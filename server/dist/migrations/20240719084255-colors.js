"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the colors table
    await queryInterface.createTable("colors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });

    // Create the UserToColors table
    await queryInterface.createTable("UserToColor", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "colors",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    });

    // Create the WebsiteToColors table
    await queryInterface.createTable("WebsiteToColor", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      websiteId: {
        type: Sequelize.UUID,
        references: {
          model: "websites",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "colors",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the tables
    await queryInterface.dropTable("WebsiteToColors");
    await queryInterface.dropTable("UserToColors");
    await queryInterface.dropTable("colors");
  },
};
