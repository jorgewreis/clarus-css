import { describe, it, expect, afterEach, vi } from "vitest";
import { NestedMenu } from "../../js/nested-menu.js";

function build() {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <button type="button" id="toggle" class="dropdown-toggle">Menu</button>
    <div class="dropdown-menu" id="root">
      <a href="#" class="dropdown-item" id="leaf1">Novo</a>
      <div class="dropdown-submenu">
        <button type="button" class="dropdown-item dropdown-item-submenu" id="sub1">Compartilhar</button>
        <div class="dropdown-menu" id="submenu1">
          <a href="#" class="dropdown-item" id="leaf2">E-mail</a>
          <div class="dropdown-submenu">
            <button type="button" class="dropdown-item dropdown-item-submenu" id="sub2">Redes</button>
            <div class="dropdown-menu" id="submenu2">
              <a href="#" class="dropdown-item" id="leaf3">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="dropdown-item" id="leaf4">Excluir</a>
    </div>
  `;
  document.body.appendChild(wrapper);

  const toggle = wrapper.querySelector("#toggle");
  return { wrapper, toggle, menu: new NestedMenu(toggle) };
}

function press(key) {
  document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

describe("NestedMenu", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("getInstance() retorna a instância criada", () => {
    const { toggle, menu } = build();
    expect(NestedMenu.getInstance(toggle)).toBe(menu);
  });

  it("reanexa o menu ao body e define ARIA em gatilho, submenus e itens de submenu", () => {
    const { toggle } = build();
    const root = document.getElementById("root");

    expect(root.parentElement).toBe(document.body);
    expect(toggle.getAttribute("aria-haspopup")).toBe("menu");
    expect(root.getAttribute("role")).toBe("menu");
    expect(document.getElementById("submenu1").getAttribute("role")).toBe("menu");
    expect(document.getElementById("sub1").getAttribute("aria-haspopup")).toBe("menu");
    expect(document.getElementById("sub1").getAttribute("aria-expanded")).toBe("false");
  });

  it("show() abre a raiz, foca o primeiro item e atualiza aria-expanded", () => {
    const { toggle, menu } = build();
    menu.show();

    expect(document.getElementById("root").classList.contains("show")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement.id).toBe("leaf1");
  });

  it("clicar num item de submenu abre o submenu sem fechar a raiz", () => {
    const { menu } = build();
    menu.show();

    document.getElementById("sub1").click();

    expect(document.getElementById("submenu1").classList.contains("show")).toBe(true);
    expect(document.getElementById("sub1").getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById("root").classList.contains("show")).toBe(true);
  });

  it("clicar de novo no item de submenu fecha o submenu", () => {
    const { menu } = build();
    menu.show();

    const sub1 = document.getElementById("sub1");
    sub1.click();
    sub1.click();

    expect(document.getElementById("submenu1").classList.contains("show")).toBe(false);
    expect(sub1.getAttribute("aria-expanded")).toBe("false");
  });

  it("clicar numa folha fecha o menu inteiro e devolve o foco ao gatilho", () => {
    const { toggle, menu } = build();
    menu.show();

    document.getElementById("leaf1").click();

    expect(document.getElementById("root").classList.contains("show")).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it("ArrowDown/ArrowUp navegam entre os itens do nível atual", () => {
    const { menu } = build();
    menu.show();

    document.getElementById("leaf1").focus();
    press("ArrowDown");
    expect(document.activeElement.id).toBe("sub1");

    press("ArrowUp");
    expect(document.activeElement.id).toBe("leaf1");
  });

  it("ArrowRight abre o submenu e foca o primeiro item dele; ArrowLeft fecha e volta", () => {
    const { menu } = build();
    menu.show();

    document.getElementById("sub1").focus();
    press("ArrowRight");
    expect(document.getElementById("submenu1").classList.contains("show")).toBe(true);
    expect(document.activeElement.id).toBe("leaf2");

    press("ArrowLeft");
    expect(document.getElementById("submenu1").classList.contains("show")).toBe(false);
    expect(document.activeElement.id).toBe("sub1");
  });

  it("Escape dentro de um submenu fecha só ele, mantendo a raiz aberta", () => {
    const { menu } = build();
    menu.show();

    document.getElementById("sub1").focus();
    press("ArrowRight"); // abre submenu1, foca leaf2
    press("Escape");

    expect(document.getElementById("submenu1").classList.contains("show")).toBe(false);
    expect(document.getElementById("root").classList.contains("show")).toBe(true);
    expect(document.activeElement.id).toBe("sub1");
  });

  it("dispara clarus:nested-menu:shown e :hidden", () => {
    const { toggle, menu } = build();
    const shown = vi.fn();
    const hidden = vi.fn();
    toggle.addEventListener("clarus:nested-menu:shown", shown);
    toggle.addEventListener("clarus:nested-menu:hidden", hidden);

    menu.show();
    expect(shown).toHaveBeenCalledTimes(1);

    menu.hide();
    expect(hidden).toHaveBeenCalledTimes(1);
  });

  it("hide() fecha todos os submenus abertos", () => {
    const { menu } = build();
    menu.show();
    document.getElementById("sub1").click();
    menu.hide();

    expect(document.getElementById("submenu1").classList.contains("show")).toBe(false);
  });

  it("dispose() remove o registro da instância", () => {
    const { toggle, menu } = build();
    menu.dispose();
    expect(NestedMenu.getInstance(toggle)).toBeUndefined();
  });
});
