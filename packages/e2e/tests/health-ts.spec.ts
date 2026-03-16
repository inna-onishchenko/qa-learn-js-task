import { test, expect } from "@playwright/test";

interface HealthResponse {
  status: string;
  language: string;
}

test("GET /api/health-ts returns ok with typescript", async ({ request }) => {
  const res = await request.get("/api/health-ts");
  expect(res.ok()).toBeTruthy();

  const body: HealthResponse = await res.json();
  expect(body.status).toBe("ok");
  expect(body.language).toBe("typescript");
});

test("GET /api/health-js returns ok with javascript", async ({ request }) => {
  const res = await request.get("/api/health-js");
  expect(res.ok()).toBeTruthy();

  const body: HealthResponse = await res.json();
  expect(body.status).toBe("ok");
  expect(body.language).toBe("javascript");
});
