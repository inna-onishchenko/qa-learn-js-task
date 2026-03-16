import { test, expect } from "@playwright/test";

test("GET /api/health-ts returns ok (TypeScript test)", async ({ request }) => {
  const res = await request.get("/api/health-ts");
  expect(res.ok()).toBeTruthy();

  const body: { status: string; language: string } = await res.json();
  expect(body).toEqual({ status: "ok", language: "typescript" });
});
