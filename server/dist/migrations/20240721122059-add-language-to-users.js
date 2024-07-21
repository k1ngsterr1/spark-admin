"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "language", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "EN",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "language");
  },
};
