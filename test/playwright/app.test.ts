import { test, expect } from "@playwright/test";

test("Home page loads successfully", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("body")).toContainText("Moodle");
});

test("Health endpoint returns OK", async ({ request }) => {
  const response = await request.get("http://localhost:3000/api/health");
  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  expect(json.status).toBe("ok");
});
