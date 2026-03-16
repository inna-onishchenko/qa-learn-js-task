const { test, expect } = require("@playwright/test");

test("GET /api/health-js returns ok", async ({ request }) => {
  const res = await request.get("/api/health-js");
  expect(res.ok()).toBeTruthy();
  expect(await res.json()).toEqual({ status: "ok", language: "javascript" });
});
