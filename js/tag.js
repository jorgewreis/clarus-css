import { autoInit, createInstanceRegistry } from "./core/register.js";

const instances = createInstanceRegistry();

// Badge dismissível / Tag: o único componente CSS-first desta leva que
// precisa de JS — só o suficiente pra remover o elemento do DOM ao clicar
// no .btn-close, sem posicionamento/foco/overlay.
export class Tag {
  constructor(tagEl) {
    this.tagEl = tagEl;

    this._handleClick = this._handleClick.bind(this);
    tagEl.addEventListener("click", this._handleClick);

    instances.set(tagEl, this);
  }

  static getInstance(el) {
    return instances.get(el);
  }

  _handleClick(event) {
    if (event.target.closest('[data-dismiss="tag"]')) {
      this.dismiss();
    }
  }

  // Dispara um evento cancelável antes de remover (mesmo espírito de
  // clarus:stepper:beforechange): preventDefault() bloqueia a remoção.
  dismiss() {
    const event = new CustomEvent("clarus:tag:dismissed", { bubbles: true, cancelable: true });
    this.tagEl.dispatchEvent(event);
    if (event.defaultPrevented) return;

    this.tagEl.remove();
  }

  dispose() {
    this.tagEl.removeEventListener("click", this._handleClick);
    instances.delete(this.tagEl);
  }
}

autoInit("tag", Tag);
