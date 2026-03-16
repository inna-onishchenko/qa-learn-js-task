const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.{js,ts}",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev -w app",
    url: "http://localhost:3000/api/health-js",
    cwd: "../..",
    reuseExistingServer: true,
  },
});
