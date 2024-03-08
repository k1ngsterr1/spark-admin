"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("websites", {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      url: {
        unique: true,
        type: Sequelize.STRING,
      },
      websiteCode: {
        unique: true,
        type: Sequelize.STRING,
      },
      owner: {
        type: Sequelize.INTEGER,
      },
      ownerEmail: {
        type: Sequelize.STRING,
      },
      users: {
        type: Sequelize.JSONB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("websites");
  },
};
