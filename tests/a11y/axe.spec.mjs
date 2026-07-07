import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const mockupDir = path.join(rootDir, "mockup");
const mockups = readdirSync(mockupDir).filter((file) => file.endsWith(".html"));

for (const file of mockups) {
  test(`${file} não tem violações de A11y (axe, WCAG 2.1 AA)`, async ({ page }) => {
    await page.goto(`file://${path.join(mockupDir, file)}`);
    await page.waitForTimeout(200);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const details = results.violations
      .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} nó(s) — ${v.helpUrl}`)
      .join("\n");

    expect(results.violations, `Violações de A11y em ${file}:\n${details}`).toHaveLength(0);
  });
}
