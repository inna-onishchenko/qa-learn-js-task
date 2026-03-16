const { test, expect } = require("@playwright/test");

// --- API tests ---

test("GET /api/health-js returns ok", async ({ request }) => {
  const res = await request.get("/api/health-js");
  expect(res.ok()).toBeTruthy();
  expect(await res.json()).toEqual({ status: "ok", language: "javascript" });
});

test("GET /api/health-ts returns ok", async ({ request }) => {
  const res = await request.get("/api/health-ts");
  expect(res.ok()).toBeTruthy();
  expect(await res.json()).toEqual({ status: "ok", language: "typescript" });
});

// --- UI test ---

test("Health check buttons display response in output", async ({ page }) => {
  await page.goto("/");

  const output = page.locator("#output");
  await expect(output).toHaveText("Ready.");

  // Click JS health button
  await page.click("#health-js-btn");
  await expect(output).toContainText('"language": "javascript"');

  // Click TS health button
  await page.click("#health-ts-btn");
  await expect(output).toContainText('"language": "typescript"');
});
