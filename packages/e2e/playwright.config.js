const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev -w app",
    url: "http://localhost:3000/api/health",
    cwd: "../..",
    reuseExistingServer: true,
  },
});
