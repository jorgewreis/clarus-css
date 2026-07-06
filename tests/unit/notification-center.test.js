import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NotificationCenter } from "../../packages/clarus-js/js/notification-center.js";

function build({ storage } = {}) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <button type="button" id="bell" data-target="#panel"${storage ? ` data-storage="${storage}"` : ""}>
      Notificações
      <span class="notification-badge" hidden>0</span>
    </button>
    <div class="notification-center" id="panel">
      <div class="notification-center-header">
        <span class="notification-center-title">Notificações</span>
        <button type="button" class="btn-close" data-notification="clear" aria-label="Limpar"></button>
      </div>
      <ul class="notification-list"></ul>
      <div class="notification-empty" hidden>Nenhuma notificação.</div>
    </div>
    <div class="toast-container" id="toasts"></div>
  `;
  document.body.appendChild(wrapper);

  const trigger = wrapper.querySelector("#bell");
  return { wrapper, trigger, center: new NotificationCenter(trigger) };
}

describe("NotificationCenter", () => {
  beforeEach(() => {
    // prefers-reduced-motion: reduce evita depender de transitionend nos toasts.
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("getInstance() retorna a instância criada", () => {
    const { trigger, center } = build();
    expect(NotificationCenter.getInstance(trigger)).toBe(center);
  });

  it("push() registra a notificação, cria um toast e atualiza o contador", () => {
    const { center } = build();

    center.push({ title: "Backup concluído", body: "Tudo certo.", variant: "success" });

    expect(center.getAll()).toHaveLength(1);
    expect(document.querySelector("#toasts .toast")).not.toBeNull();
    expect(document.querySelector(".notification-item-title").textContent).toBe("Backup concluído");

    const badge = document.querySelector(".notification-badge");
    expect(badge.hasAttribute("hidden")).toBe(false);
    expect(badge.textContent).toBe("1");
  });

  it("escapa HTML no título/corpo da notificação", () => {
    const { center } = build();
    center.push({ title: "<img src=x onerror=alert(1)>", body: "<b>oi</b>" });

    const item = document.querySelector(".notification-item");
    expect(item.querySelector(".notification-item-title").innerHTML).not.toContain("<img");
    expect(item.querySelector(".notification-item-text").innerHTML).not.toContain("<b>");
  });

  it("open() marca tudo como lido (zera o contador) e mostra o painel", () => {
    const { trigger, center } = build();
    center.push({ title: "A" });
    center.push({ title: "B" });

    center.open();

    const panel = document.querySelector("#panel");
    expect(panel.classList.contains("show")).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(center.unreadCount).toBe(0);
    expect(document.querySelector(".notification-badge").hasAttribute("hidden")).toBe(true);
  });

  it("clicar em [data-notification-dismiss] remove só aquela notificação", () => {
    const { center } = build();
    center.push({ title: "A" });
    center.push({ title: "B" });

    // Mais recente primeiro: o primeiro item é "B".
    document.querySelector(".notification-item [data-notification-dismiss]").click();

    expect(center.getAll().map((r) => r.title)).toEqual(["A"]);
  });

  it("o botão limpar do cabeçalho esvazia o histórico e mostra o estado vazio", () => {
    const { center } = build();
    center.push({ title: "A" });

    document.querySelector('[data-notification="clear"]').click();

    expect(center.getAll()).toHaveLength(0);
    expect(document.querySelector(".notification-empty").hasAttribute("hidden")).toBe(false);
    expect(document.querySelector(".notification-badge").hasAttribute("hidden")).toBe(true);
  });

  it("dispara clarus:notification:pushed / opened / cleared", () => {
    const { trigger, center } = build();
    const pushed = vi.fn();
    const opened = vi.fn();
    const cleared = vi.fn();
    trigger.addEventListener("clarus:notification:pushed", pushed);
    trigger.addEventListener("clarus:notification:opened", opened);
    trigger.addEventListener("clarus:notification:cleared", cleared);

    center.push({ title: "A" });
    center.open();
    center.clear();

    expect(pushed).toHaveBeenCalledTimes(1);
    expect(opened).toHaveBeenCalledTimes(1);
    expect(cleared).toHaveBeenCalledTimes(1);
  });

  it("data-storage=local persiste o histórico entre instâncias", () => {
    const first = build({ storage: "local" });
    first.center.push({ title: "Persistente" });
    first.center.dispose();
    first.wrapper.remove();

    const second = build({ storage: "local" });
    expect(second.center.getAll().map((r) => r.title)).toEqual(["Persistente"]);
  });

  it("dispose() remove o registro da instância", () => {
    const { trigger, center } = build();
    center.dispose();
    expect(NotificationCenter.getInstance(trigger)).toBeUndefined();
  });
});
