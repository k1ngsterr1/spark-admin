const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js", // Or set to false if not needed

    video: false,
    chromeWebSecurity: false,
  },
});
