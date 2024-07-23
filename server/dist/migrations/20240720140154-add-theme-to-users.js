"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "theme", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "light",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "theme");
  },
};
