import { Modal } from "./modal.js";

let idCounter = 0;

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

// Alert Dialog / Confirm: ao contrário dos demais componentes (auto-init
// declarativo via data-clarus), é 100% programático — monta o modal na hora,
// reaproveitando js/modal.js (foco/teclado/overlay já prontos) sem precisar
// de marcação pré-declarada na página. Resolve `true` (confirmado), `false`
// (cancelado ou fechado por Escape/clique fora).
export function confirm(options = {}) {
  const { title = "Tem certeza?", message = "", confirmText = "Confirmar", cancelText = "Cancelar", variant = "danger" } = options;

  return new Promise((resolve) => {
    idCounter += 1;
    const modalId = `clarus-confirm-${idCounter}`;
    const invokerEl = document.activeElement instanceof HTMLElement ? document.activeElement : document.body;

    const modalEl = document.createElement("div");
    modalEl.className = "modal alert-dialog";
    modalEl.id = modalId;
    modalEl.innerHTML = `
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body">
            <h3 class="modal-title">${escapeHtml(title)}</h3>
            ${message ? `<p class="alert-dialog-message">${escapeHtml(message)}</p>` : ""}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-action="cancel">${escapeHtml(cancelText)}</button>
            <button type="button" class="btn btn-${variant}" data-action="confirm">${escapeHtml(confirmText)}</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    // Modal exige um gatilho com data-target; sintético porque não há um
    // botão real "abrindo" este modal (ele nasce já aberto).
    const triggerEl = document.createElement("button");
    triggerEl.type = "button";
    triggerEl.setAttribute("data-target", `#${modalId}`);
    triggerEl.style.display = "none";
    document.body.appendChild(triggerEl);

    const modal = new Modal(triggerEl);
    let settled = false;

    const finish = (result) => {
      if (settled) return;
      settled = true;

      modal.dispose();
      modalEl.remove();
      triggerEl.remove();
      invokerEl.focus?.();
      resolve(result);
    };

    modalEl.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (action === "confirm") finish(true);
      else if (action === "cancel") finish(false);
    });

    // Escape e clique fora chamam modal.hide() internamente, que dispara
    // este evento no gatilho (não no modalEl) — conta como cancelamento.
    triggerEl.addEventListener("clarus:modal:hidden", () => finish(false));

    modal.show();
  });
}
