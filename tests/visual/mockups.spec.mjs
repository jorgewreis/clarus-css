import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const mockupDir = path.join(rootDir, "mockup");
const mockups = readdirSync(mockupDir).filter((file) => file.endsWith(".html"));

async function waitForShowcaseFrames(page) {
  await page.waitForFunction(() => [...document.querySelectorAll("iframe")]
    .every((frame) => frame.contentDocument?.readyState === "complete"
      && frame.contentDocument.body?.childElementCount > 0));
}

for (const file of mockups) {
  const themes = file === "kitchen-sink.html" ? ["light"] : ["light", "dark"];
  for (const theme of themes) {
  test.describe(`${file} (${theme})`, () => {
    test("carrega sem erros de console", async ({ page }) => {
      const errors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(String(err)));

      await page.goto(`file://${path.join(mockupDir, file)}?theme=${theme}`);
      await waitForShowcaseFrames(page);
      await page.waitForTimeout(200);

      expect(errors, `Erros de console em ${file}: ${errors.join("; ")}`).toHaveLength(0);
    });

    test("bate com o screenshot de baseline", async ({ page }) => {
      await page.goto(`file://${path.join(mockupDir, file)}?theme=${theme}`);
      await waitForShowcaseFrames(page);
      await page.waitForTimeout(200);

      await expect(page).toHaveScreenshot(`${file}-${theme}.png`, { fullPage: true });
    });
  });
  }
}
