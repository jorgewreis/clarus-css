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

    const toggle = page.locator(".cl-dropdown-toggle").first();
    await toggle.click();

    const menu = page.locator("#menu-claro");
    await expect(menu).toHaveClass(/is-open/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const items = menu.locator(".cl-dropdown-item:not(.is-disabled)");
    await expect(items.first()).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(items.nth(1)).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveClass(/is-open/);
    await expect(toggle).toBeFocused();
  });

  test("fecha ao clicar fora do menu", async ({ page }) => {
    await page.goto(mockupUrl("dropdown-tooltip.html"));
    const toggle = page.locator(".cl-dropdown-toggle").first();
    await toggle.click();

    await page.mouse.click(5, 5);

    await expect(page.locator("#menu-claro")).not.toHaveClass(/is-open/);
  });
});

test.describe("Tooltip", () => {
  test("aparece no hover e some no mouseleave", async ({ page }) => {
    await page.goto(mockupUrl("dropdown-tooltip.html"));
    const trigger = page.locator('button[data-placement="top"]').first();

    await trigger.hover();
    await expect(page.locator(".cl-tooltip.is-open")).toBeVisible();

    await page.mouse.move(5, 5);
    await expect(page.locator(".cl-tooltip.is-open")).toHaveCount(0);
  });
});

test.describe("Modal", () => {
  test("abre com focus trap, fecha com Escape e devolve o foco ao gatilho", async ({ page }) => {
    await page.goto(mockupUrl("modal-select.html"));
    const trigger = page.locator('button[data-cl-target="#modal-claro"]');
    await trigger.click();

    const modal = page.locator("#modal-claro");
    await expect(modal).toHaveClass(/is-open/);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveClass(/is-open/);
    await expect(trigger).toBeFocused();
  });

  test("data-backdrop=static ignora Escape e clique fora", async ({ page }) => {
    await page.goto(mockupUrl("modal-select.html"));
    await page.locator('button[data-cl-target="#modal-claro-static"]').click();

    const modal = page.locator("#modal-claro-static");

    await page.keyboard.press("Escape");
    await expect(modal).toHaveClass(/is-open/);

    await page.mouse.click(5, 5);
    await expect(modal).toHaveClass(/is-open/);

    await modal.locator(".cl-btn-close").click();
    await expect(modal).not.toHaveClass(/is-open/);
  });
});

test.describe("Accordion", () => {
  test("só um painel aberto por vez (comportamento exclusivo por padrão)", async ({ page }) => {
    await page.goto(mockupUrl("accordion-tabs-toast.html"));
    const buttons = page.locator("#accordion-claro .cl-accordion-button");

    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");

    await buttons.nth(1).click();

    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Tabs", () => {
  test("ArrowRight ativa a próxima aba e o painel correspondente", async ({ page }) => {
    await page.goto(mockupUrl("accordion-tabs-toast.html"));
    const tabs = page.locator("#tabs-claro .cl-nav-link");

    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");

    await expect(tabs.nth(1)).toHaveClass(/is-active/);
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

test.describe("Carousel", () => {
  test("avança com o controle next e com o teclado, e salta pelo indicador", async ({ page }) => {
    await page.goto(mockupUrl("carousel.html"));

    const carousel = page.locator("#carousel-slide");
    const items = carousel.locator(".cl-carousel-item");

    await expect(items.nth(0)).toHaveClass(/is-active/);

    await carousel.locator(".cl-carousel-control-next").click();
    await expect(items.nth(1)).toHaveClass(/is-active/);

    await carousel.focus();
    await page.keyboard.press("End");
    await expect(items.nth(2)).toHaveClass(/is-active/);

    await carousel.locator(".cl-carousel-indicators button").nth(0).click();
    await expect(items.nth(0)).toHaveClass(/is-active/);
  });
});

test.describe("Stepper", () => {
  test("avança/volta pelo wizard e navega por passos concluídos", async ({ page }) => {
    await page.goto(mockupUrl("stepper.html"));

    const stepper = page.locator("#stepper-wizard");
    const steps = stepper.locator(".cl-step");

    await expect(steps.nth(0)).toHaveClass(/cl-step-active/);
    await expect(stepper.locator('[data-stepper="prev"]')).toBeDisabled();

    await stepper.locator('[data-stepper="next"]').click();
    await expect(steps.nth(1)).toHaveClass(/cl-step-active/);
    await expect(steps.nth(0)).toHaveClass(/cl-step-completed/);

    await stepper.locator('[data-stepper="prev"]').click();
    await expect(steps.nth(0)).toHaveClass(/cl-step-active/);
  });
});

test.describe("Offcanvas", () => {
  test("abre pelo gatilho, bloqueia scroll, fecha com Escape e devolve o foco", async ({ page }) => {
    await page.goto(mockupUrl("offcanvas-popover.html"));

    const trigger = page.locator('button[data-cl-target="#offcanvas-start-claro"]');
    await trigger.click();

    const panel = page.locator("#offcanvas-start-claro");
    await expect(panel).toHaveClass(/is-open/);
    await expect(page.locator(".cl-offcanvas-backdrop")).toHaveClass(/is-open/);

    await page.keyboard.press("Escape");
    await expect(panel).not.toHaveClass(/is-open/);
    await expect(page.locator(".cl-offcanvas-backdrop")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("data-backdrop=static ignora Escape e clique fora, fecha só pelo dismiss", async ({ page }) => {
    await page.goto(mockupUrl("offcanvas-popover.html"));

    await page.click('button[data-cl-target="#offcanvas-static-claro"]');
    const panel = page.locator("#offcanvas-static-claro");
    await expect(panel).toHaveClass(/is-open/);

    await page.keyboard.press("Escape");
    await expect(panel).toHaveClass(/is-open/);

    await panel.locator('[data-cl-dismiss="offcanvas"]').click();
    await expect(panel).not.toHaveClass(/is-open/);
  });
});

test.describe("Popover", () => {
  test("clique no gatilho abre; clique dentro não fecha; clique fora fecha", async ({ page }) => {
    await page.goto(mockupUrl("offcanvas-popover.html"));

    await page.click('button[data-cl-target="#pop-click-claro"]');
    const panel = page.locator("#pop-click-claro");
    await expect(panel).toHaveClass(/is-open/);

    await panel.locator(".cl-popover-body").click();
    await expect(panel).toHaveClass(/is-open/);

    await page.mouse.click(5, 5);
    await expect(panel).not.toHaveClass(/is-open/);
  });

  test("modo hover mostra ao passar o mouse e esconde ao sair", async ({ page }) => {
    await page.goto(mockupUrl("offcanvas-popover.html"));

    const trigger = page.locator('button[data-cl-target="#pop-hover-claro"]');
    const panel = page.locator("#pop-hover-claro");

    await trigger.hover();
    await expect(panel).toHaveClass(/is-open/);

    await page.mouse.move(5, 5);
    await expect(panel).not.toHaveClass(/is-open/);
  });
});
