"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding createdAt
    await queryInterface.addColumn("theme", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    // Adding updatedAt
    await queryInterface.addColumn("theme", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    // Adding a trigger to automatically update the updatedAt column
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      CREATE TRIGGER update_updated_at_before_update
      BEFORE UPDATE ON "theme"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove trigger
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_updated_at_before_update ON "theme";
      DROP FUNCTION IF EXISTS update_updated_at_column;
    `);

    // Removing createdAt and updatedAt
    await queryInterface.removeColumn("theme", "createdAt");
    await queryInterface.removeColumn("theme", "updatedAt");
  },
};
