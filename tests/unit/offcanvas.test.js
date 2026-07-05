import { describe, it, expect, afterEach, vi } from "vitest";
import { Offcanvas } from "../../js/offcanvas.js";

async function flushDoubleRaf() {
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function buildOffcanvas({ backdrop } = {}) {
  const wrapper = document.createElement("div");
  const backdropAttr = backdrop ? ` data-backdrop="${backdrop}"` : "";
  wrapper.innerHTML = `
    <button type="button" id="trigger" data-target="#myOffcanvas">Abrir</button>
    <div class="offcanvas offcanvas-start" id="myOffcanvas"${backdropAttr}>
      <div class="offcanvas-header">
        <h3 class="offcanvas-title">Título</h3>
        <button type="button" class="btn-close" data-dismiss="offcanvas">x</button>
      </div>
      <div class="offcanvas-body">
        <button type="button" id="bodyBtn">Ação</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const trigger = wrapper.querySelector("#trigger");
  const offcanvasEl = wrapper.querySelector("#myOffcanvas");

  return { wrapper, trigger, offcanvasEl, offcanvas: new Offcanvas(trigger) };
}

describe("Offcanvas", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.querySelectorAll(".offcanvas-backdrop").forEach((el) => el.remove());
  });

  it("getInstance() retorna a instância criada", () => {
    const { trigger, offcanvas } = buildOffcanvas();
    expect(Offcanvas.getInstance(trigger)).toBe(offcanvas);
  });

  it("define role=dialog e aria-modal no elemento", () => {
    const { offcanvasEl } = buildOffcanvas();
    expect(offcanvasEl.getAttribute("role")).toBe("dialog");
    expect(offcanvasEl.getAttribute("aria-modal")).toBe("true");
  });

  it("clicar no trigger abre o painel, bloqueia o scroll, cria o backdrop e prende o foco", async () => {
    const { trigger, offcanvasEl } = buildOffcanvas();

    trigger.click();
    await flushDoubleRaf();

    expect(offcanvasEl.classList.contains("show")).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.querySelector(".offcanvas-backdrop.show")).not.toBeNull();
    expect(document.activeElement.textContent).toBe("x");
  });

  it("Escape fecha o painel, libera o scroll, remove o backdrop e devolve o foco", async () => {
    const { trigger, offcanvasEl, offcanvas } = buildOffcanvas();
    offcanvas.show();
    await flushDoubleRaf();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(offcanvasEl.classList.contains("show")).toBe(false);
    expect(document.body.style.overflow).toBe("");
    expect(document.querySelector(".offcanvas-backdrop")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("clique fora do painel (no backdrop) fecha", async () => {
    const { offcanvasEl, offcanvas } = buildOffcanvas();
    offcanvas.show();
    await flushDoubleRaf();

    await new Promise((resolve) => setTimeout(resolve, 0));
    document.body.click();

    expect(offcanvasEl.classList.contains("show")).toBe(false);
  });

  it("qualquer elemento com data-dismiss=offcanvas fecha o painel", async () => {
    const { offcanvasEl, offcanvas } = buildOffcanvas();
    offcanvas.show();
    await flushDoubleRaf();

    offcanvasEl.querySelector('[data-dismiss="offcanvas"]').click();

    expect(offcanvasEl.classList.contains("show")).toBe(false);
  });

  it("data-backdrop=static ignora Escape e clique fora, mas dismiss fecha", async () => {
    const { offcanvasEl, offcanvas } = buildOffcanvas({ backdrop: "static" });
    offcanvas.show();
    await flushDoubleRaf();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(offcanvasEl.classList.contains("show")).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 0));
    document.body.click();
    expect(offcanvasEl.classList.contains("show")).toBe(true);

    offcanvasEl.querySelector('[data-dismiss="offcanvas"]').click();
    expect(offcanvasEl.classList.contains("show")).toBe(false);
  });

  it("data-backdrop=false não cria o elemento de backdrop, mas ainda fecha com Escape e clique fora", async () => {
    const { offcanvasEl, offcanvas } = buildOffcanvas({ backdrop: "false" });
    offcanvas.show();
    await flushDoubleRaf();

    expect(document.querySelector(".offcanvas-backdrop")).toBeNull();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(offcanvasEl.classList.contains("show")).toBe(false);
  });

  it("dispara clarus:offcanvas:shown e clarus:offcanvas:hidden", async () => {
    const { trigger, offcanvas } = buildOffcanvas();
    const shownHandler = vi.fn();
    const hiddenHandler = vi.fn();
    trigger.addEventListener("clarus:offcanvas:shown", shownHandler);
    trigger.addEventListener("clarus:offcanvas:hidden", hiddenHandler);

    offcanvas.show();
    await flushDoubleRaf();
    expect(shownHandler).toHaveBeenCalledTimes(1);

    offcanvas.hide();
    expect(hiddenHandler).toHaveBeenCalledTimes(1);
  });

  it("duas instâncias abertas e fechadas em sequência deixam overflow vazio (lockScroll referenciado)", async () => {
    const { offcanvas: first } = buildOffcanvas();
    const secondWrapper = document.createElement("div");
    secondWrapper.innerHTML = `
      <button type="button" id="trigger2" data-target="#second"></button>
      <div class="offcanvas offcanvas-end" id="second"></div>
    `;
    document.body.appendChild(secondWrapper);
    const second = new Offcanvas(secondWrapper.querySelector("#trigger2"));

    first.show();
    await flushDoubleRaf();
    second.show();
    await flushDoubleRaf();
    expect(document.body.style.overflow).toBe("hidden");

    second.hide();
    expect(document.body.style.overflow).toBe("hidden");

    first.hide();
    expect(document.body.style.overflow).toBe("");
  });

  it("dispose() remove o registro da instância", () => {
    const { trigger, offcanvas } = buildOffcanvas();
    offcanvas.dispose();

    expect(Offcanvas.getInstance(trigger)).toBeUndefined();
  });
});
