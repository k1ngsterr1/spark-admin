"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("theme", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "light",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("theme");
  },
};
