import { describe, it, expect, afterEach } from "vitest";
import { confirm } from "../../js/confirm.js";

describe("confirm()", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.body.style.overflow = "";
  });

  it("monta o modal com título, mensagem e textos dos botões informados", async () => {
    confirm({
      title: "Excluir item?",
      message: "Essa ação não pode ser desfeita.",
      confirmText: "Excluir",
      cancelText: "Voltar",
      variant: "danger",
    });

    const modalEl = document.querySelector(".modal.alert-dialog");
    expect(modalEl.querySelector(".modal-title").textContent).toBe("Excluir item?");
    expect(modalEl.querySelector(".alert-dialog-message").textContent).toBe("Essa ação não pode ser desfeita.");
    expect(modalEl.querySelector('[data-action="confirm"]').textContent).toBe("Excluir");
    expect(modalEl.querySelector('[data-action="cancel"]').textContent).toBe("Voltar");
    expect(modalEl.querySelector(".alert-dialog-icon-danger")).not.toBeNull();
  });

  it("usa variant=danger e título/textos padrão quando nada é informado", async () => {
    confirm();

    const modalEl = document.querySelector(".modal.alert-dialog");
    expect(modalEl.querySelector(".modal-title").textContent).toBe("Tem certeza?");
    expect(modalEl.querySelector('[data-action="confirm"]').textContent).toBe("Confirmar");
    expect(modalEl.querySelector('[data-action="cancel"]').textContent).toBe("Cancelar");
    expect(modalEl.querySelector(".alert-dialog-message")).toBeNull();
  });

  it("abre o modal (show) imediatamente", () => {
    confirm({ title: "Título" });
    expect(document.querySelector(".modal.alert-dialog.show")).not.toBeNull();
  });

  it("resolve true ao clicar em confirmar, e remove o modal do DOM", async () => {
    const promise = confirm({ title: "Título" });

    document.querySelector('[data-action="confirm"]').click();
    const result = await promise;

    expect(result).toBe(true);
    expect(document.querySelector(".modal.alert-dialog")).toBeNull();
  });

  it("resolve false ao clicar em cancelar", async () => {
    const promise = confirm({ title: "Título" });

    document.querySelector('[data-action="cancel"]').click();

    expect(await promise).toBe(false);
  });

  it("resolve false ao pressionar Escape", async () => {
    const promise = confirm({ title: "Título" });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(await promise).toBe(false);
  });

  it("devolve o foco ao elemento que estava focado antes de chamar confirm()", async () => {
    const invoker = document.createElement("button");
    invoker.textContent = "Excluir";
    document.body.appendChild(invoker);
    invoker.focus();

    const promise = confirm({ title: "Título" });
    document.querySelector('[data-action="cancel"]').click();
    await promise;

    expect(document.activeElement).toBe(invoker);
  });

  it("escapa HTML em título/mensagem (não interpreta marcação)", async () => {
    confirm({ title: "<img src=x onerror=alert(1)>", message: "<b>oi</b>" });

    const modalEl = document.querySelector(".modal.alert-dialog");
    expect(modalEl.querySelector(".modal-title").innerHTML).not.toContain("<img");
    expect(modalEl.querySelector(".alert-dialog-message").innerHTML).not.toContain("<b>");
  });
});
