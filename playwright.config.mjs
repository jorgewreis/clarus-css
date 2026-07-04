import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/visual",
  fullyParallel: true,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
});
