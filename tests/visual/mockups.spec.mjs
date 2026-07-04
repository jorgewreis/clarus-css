import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const mockupDir = path.join(rootDir, "mockup");
const mockups = readdirSync(mockupDir).filter((file) => file.endsWith(".html"));

for (const file of mockups) {
  test.describe(file, () => {
    test("carrega sem erros de console", async ({ page }) => {
      const errors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(String(err)));

      await page.goto(`file://${path.join(mockupDir, file)}`);
      await page.waitForTimeout(200);

      expect(errors, `Erros de console em ${file}: ${errors.join("; ")}`).toHaveLength(0);
    });

    test("bate com o screenshot de baseline", async ({ page }) => {
      await page.goto(`file://${path.join(mockupDir, file)}`);
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot(`${file}.png`, { fullPage: true });
    });
  });
}
