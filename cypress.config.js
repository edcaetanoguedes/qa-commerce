const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { defineConfig } = require("cypress");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
require("dotenv").config();


module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.feature",
    //stepDefinitions: "cypress/support/step_definitions",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 2000, // Tempo máximo para cada comando (2s)
    slowTestThreshold: 2000,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }))
      return config;
    }
  },
  env: {
    "CY_SECRET_KEY": process.env.SECRET_KEY
  }
});
