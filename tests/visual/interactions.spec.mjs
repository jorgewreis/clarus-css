import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));

function mockupUrl(name) {
  return `file://${path.join(rootDir, "mockup", name)}`;
}

test.describe("Dropdown", () => {
  test("abre com clique, navega com ArrowDown, fecha com Escape e devolve o foco", async ({ page }) => {
    await page.goto(mockupUrl("dropdown-tooltip.html"));

    const toggle = page.locator(".dropdown-toggle").first();
    await toggle.click();

    const menu = page.locator("#menu-claro");
    await expect(menu).toHaveClass(/show/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const items = menu.locator(".dropdown-item:not(.disabled)");
    await expect(items.first()).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(items.nth(1)).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveClass(/show/);
    await expect(toggle).toBeFocused();
  });

  test("fecha ao clicar fora do menu", async ({ page }) => {
    await page.goto(mockupUrl("dropdown-tooltip.html"));
    const toggle = page.locator(".dropdown-toggle").first();
    await toggle.click();

    await page.mouse.click(5, 5);

    await expect(page.locator("#menu-claro")).not.toHaveClass(/show/);
  });
});

test.describe("Tooltip", () => {
  test("aparece no hover e some no mouseleave", async ({ page }) => {
    await page.goto(mockupUrl("dropdown-tooltip.html"));
    const trigger = page.locator('button[data-placement="top"]').first();

    await trigger.hover();
    await expect(page.locator(".tooltip.show")).toBeVisible();

    await page.mouse.move(5, 5);
    await expect(page.locator(".tooltip.show")).toHaveCount(0);
  });
});

test.describe("Modal", () => {
  test("abre com focus trap, fecha com Escape e devolve o foco ao gatilho", async ({ page }) => {
    await page.goto(mockupUrl("modal-select.html"));
    const trigger = page.locator('button[data-target="#modal-claro"]');
    await trigger.click();

    const modal = page.locator("#modal-claro");
    await expect(modal).toHaveClass(/show/);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveClass(/show/);
    await expect(trigger).toBeFocused();
  });

  test("data-backdrop=static ignora Escape e clique fora", async ({ page }) => {
    await page.goto(mockupUrl("modal-select.html"));
    await page.locator('button[data-target="#modal-claro-static"]').click();

    const modal = page.locator("#modal-claro-static");

    await page.keyboard.press("Escape");
    await expect(modal).toHaveClass(/show/);

    await page.mouse.click(5, 5);
    await expect(modal).toHaveClass(/show/);

    await modal.locator(".btn-close").click();
    await expect(modal).not.toHaveClass(/show/);
  });
});

test.describe("Accordion", () => {
  test("só um painel aberto por vez (comportamento exclusivo por padrão)", async ({ page }) => {
    await page.goto(mockupUrl("accordion-tabs-toast.html"));
    const buttons = page.locator("#accordion-claro .accordion-button");

    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");

    await buttons.nth(1).click();

    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Tabs", () => {
  test("ArrowRight ativa a próxima aba e o painel correspondente", async ({ page }) => {
    await page.goto(mockupUrl("accordion-tabs-toast.html"));
    const tabs = page.locator("#tabs-claro .nav-link");

    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");

    await expect(tabs.nth(1)).toHaveClass(/active/);
    await expect(page.locator("#tab-seguranca-claro")).toBeVisible();
  });
});

test.describe("Toast", () => {
  test("aparece ao acionar o gatilho e some sozinho após o delay", async ({ page }) => {
    await page.goto(mockupUrl("accordion-tabs-toast.html"));

    await page.click("#toast-trigger-claro");
    await expect(page.locator("#toast-claro")).toBeVisible();

    await page.waitForTimeout(4500);
    await expect(page.locator("#toast-claro")).toBeHidden();
  });
});
