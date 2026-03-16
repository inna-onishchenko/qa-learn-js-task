import { test, expect } from "@playwright/test";

interface HealthResponse {
  status: string;
  language: "javascript" | "typescript";
}

// --- API tests ---

test("GET /api/health-js returns ok", async ({ request }) => {
  const res = await request.get("/api/health-js");
  expect(res.ok()).toBeTruthy();

  const body: HealthResponse = await res.json();
  expect(body.status).toBe("ok");
  expect(body.language).toBe("javascript");
});

test("GET /api/health-ts returns ok", async ({ request }) => {
  const res = await request.get("/api/health-ts");
  expect(res.ok()).toBeTruthy();

  const body: HealthResponse = await res.json();
  expect(body.status).toBe("ok");
  expect(body.language).toBe("typescript");
});

// --- UI test ---

test("Health check buttons display response in output", async ({ page }) => {
  await page.goto("/");

  const output = page.locator("#output");
  await expect(output).toHaveText("Ready.");

  await page.click("#health-js-btn");
  await expect(output).toContainText('"language": "javascript"');

  await page.click("#health-ts-btn");
  await expect(output).toContainText('"language": "typescript"');
});
