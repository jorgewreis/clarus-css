import { describe, it, expect, afterEach, vi } from "vitest";
import { Stepper } from "../../js/stepper.js";

function buildStepper({ linear } = {}) {
  const container = document.createElement("div");
  const linearAttr = linear === false ? ' data-linear="false"' : "";
  container.innerHTML = `
    <div class="stepper" id="stepper"${linearAttr}>
      <ol class="stepper-header">
        <li class="step step-active"><span class="step-indicator">1</span><span class="step-label">Um</span></li>
        <li class="step"><span class="step-indicator">2</span><span class="step-label">Dois</span></li>
        <li class="step"><span class="step-indicator">3</span><span class="step-label">Três</span></li>
      </ol>
      <div class="stepper-content">
        <div class="step-panel active" id="p1">P1</div>
        <div class="step-panel" id="p2">P2</div>
        <div class="step-panel" id="p3">P3</div>
      </div>
      <div class="stepper-actions">
        <button data-stepper="prev">Anterior</button>
        <button data-stepper="next">Próximo</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);
  const el = container.querySelector("#stepper");
  return { container, el, stepper: new Stepper(el) };
}

describe("Stepper", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("getInstance() retorna a instância criada", () => {
    const { el, stepper } = buildStepper();
    expect(Stepper.getInstance(el)).toBe(stepper);
  });

  it("estado inicial: passo 0 ativo, prev desabilitado, aria-current", () => {
    const { el } = buildStepper();
    const steps = el.querySelectorAll(".step");
    expect(steps[0].classList.contains("step-active")).toBe(true);
    expect(steps[0].getAttribute("aria-current")).toBe("step");
    expect(steps[1].getAttribute("aria-current")).toBe("false");
    expect(el.querySelector('[data-stepper="prev"]').disabled).toBe(true);
  });

  it("next() avança, marca anteriores como completed e mostra o painel", () => {
    const { el } = buildStepper();
    const steps = el.querySelectorAll(".step");

    el.querySelector('[data-stepper="next"]').click();

    expect(steps[1].classList.contains("step-active")).toBe(true);
    expect(steps[0].classList.contains("step-completed")).toBe(true);
    expect(document.getElementById("p2").classList.contains("active")).toBe(true);
    expect(document.getElementById("p1").classList.contains("active")).toBe(false);
    expect(el.querySelector('[data-stepper="prev"]').disabled).toBe(false);
  });

  it("prev() volta um passo", () => {
    const { el, stepper } = buildStepper();
    stepper.next();
    stepper.prev();
    expect(el.querySelectorAll(".step")[0].classList.contains("step-active")).toBe(true);
  });

  it("modo linear: clicar num passo à frente é ignorado; voltar para concluído funciona", () => {
    const { el, stepper } = buildStepper();
    const steps = el.querySelectorAll(".step");

    steps[2].click(); // à frente do atual (0) → ignorado
    expect(steps[0].classList.contains("step-active")).toBe(true);

    stepper.next(); // agora no passo 1
    steps[0].click(); // volta para o concluído
    expect(steps[0].classList.contains("step-active")).toBe(true);
  });

  it("data-linear=false permite pular para qualquer passo pelo cabeçalho", () => {
    const { el } = buildStepper({ linear: false });
    const steps = el.querySelectorAll(".step");
    steps[2].click();
    expect(steps[2].classList.contains("step-active")).toBe(true);
  });

  it("clarus:stepper:beforechange cancelável bloqueia a troca", () => {
    const { el } = buildStepper();
    const steps = el.querySelectorAll(".step");
    el.addEventListener("clarus:stepper:beforechange", (e) => e.preventDefault());

    el.querySelector('[data-stepper="next"]').click();

    expect(steps[0].classList.contains("step-active")).toBe(true);
    expect(steps[1].classList.contains("step-active")).toBe(false);
  });

  it("dispara clarus:stepper:changed com from/to", () => {
    const { el, stepper } = buildStepper();
    const handler = vi.fn();
    el.addEventListener("clarus:stepper:changed", handler);

    stepper.next();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ from: 0, to: 1 });
  });

  it("next() no último passo dispara clarus:stepper:completed e marca tudo concluído", () => {
    const { el, stepper } = buildStepper();
    const handler = vi.fn();
    el.addEventListener("clarus:stepper:completed", handler);

    stepper.goTo(2);
    stepper.next(); // já no último → completa

    expect(handler).toHaveBeenCalledTimes(1);
    expect([...el.querySelectorAll(".step")].every((s) => s.classList.contains("step-completed"))).toBe(true);
  });

  it("setError() alterna a classe step-error no passo", () => {
    const { el, stepper } = buildStepper();
    stepper.setError(1, true);
    expect(el.querySelectorAll(".step")[1].classList.contains("step-error")).toBe(true);
    stepper.setError(1, false);
    expect(el.querySelectorAll(".step")[1].classList.contains("step-error")).toBe(false);
  });

  it("dispose() remove listeners e o registro", () => {
    const { el, stepper } = buildStepper();
    stepper.dispose();
    expect(Stepper.getInstance(el)).toBeUndefined();
  });
});
