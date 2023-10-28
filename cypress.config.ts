import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    baseUrl: "https://www.saucedemo.com/",
    viewportHeight: 1080,
    viewportWidth: 1920,
    scrollBehavior: "center",
    video: false,
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
