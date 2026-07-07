import { describe, it, expect, afterEach, vi } from "vitest";
import { createElement, createRef } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { ModalTrigger, ModalPanel, DropdownTrigger, DropdownMenu, TabList } from "../../packages/clarus-react/src/index.js";

let container;
let root;

function render(element) {
  act(() => {
    root.render(element);
  });
}

describe("clarus-react", () => {
  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
  });

  it("ModalTrigger instancia o Modal vanilla e expõe show/hide via ref", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    const ref = createRef();
    render(
      createElement(
        "div",
        null,
        createElement(ModalTrigger, { ref, target: "#modal-teste" }, "Abrir"),
        createElement(ModalPanel, { id: "modal-teste" }, createElement("div", { className: "cl-modal-body" }, "Conteúdo")),
      ),
    );

    const modalEl = document.getElementById("modal-teste");
    expect(modalEl).not.toBeNull();
    expect(modalEl.classList.contains("cl-modal")).toBe(true);

    act(() => {
      ref.current.show();
    });
    expect(modalEl.classList.contains("is-open")).toBe(true);

    act(() => {
      ref.current.hide();
    });
    expect(modalEl.classList.contains("is-open")).toBe(false);
  });

  it("ModalTrigger desfaz a instância (dispose) no unmount", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    const ref = createRef();
    render(
      createElement(
        "div",
        null,
        createElement(ModalTrigger, { ref, target: "#modal-unmount" }, "Abrir"),
        createElement(ModalPanel, { id: "modal-unmount" }),
      ),
    );

    act(() => {
      root.unmount();
    });

    // Depois do dispose(), chamar show() não deve lançar nem reabrir nada
    // (a instância vanilla removeu seus listeners e saiu do registro).
    expect(() => ref.current?.show()).not.toThrow();
  });

  it("DropdownTrigger instancia o Dropdown vanilla e abre/fecha via ref", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    const ref = createRef();
    render(
      createElement(
        "div",
        { className: "cl-dropdown" },
        createElement(DropdownTrigger, { ref, target: "#menu-teste" }, "Opções"),
        createElement(DropdownMenu, { id: "menu-teste" }, createElement("a", { href: "#", className: "cl-dropdown-item" }, "Item")),
      ),
    );

    const menuEl = document.getElementById("menu-teste");
    act(() => {
      ref.current.show();
    });
    expect(menuEl.classList.contains("is-open")).toBe(true);

    act(() => {
      ref.current.toggle();
    });
    expect(menuEl.classList.contains("is-open")).toBe(false);
  });

  it("TabList instancia o Tabs vanilla sobre os filhos declarados e alterna via ref", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    const ref = createRef();
    render(
      createElement(
        "div",
        null,
        createElement(
          TabList,
          { ref },
          createElement("a", { href: "#", className: "cl-nav-link is-active", "data-cl-target": "#painel-a" }, "A"),
          createElement("a", { href: "#", className: "cl-nav-link", "data-cl-target": "#painel-b" }, "B"),
        ),
        createElement("div", { className: "cl-tab-pane is-active", id: "painel-a" }, "Painel A"),
        createElement("div", { className: "cl-tab-pane", id: "painel-b" }, "Painel B"),
      ),
    );

    const tabB = container.querySelectorAll(".cl-nav-link")[1];
    act(() => {
      ref.current.show(tabB);
    });

    expect(tabB.classList.contains("is-active")).toBe(true);
    expect(document.getElementById("painel-b").classList.contains("is-active")).toBe(true);
    expect(document.getElementById("painel-a").classList.contains("is-active")).toBe(false);
  });
});
