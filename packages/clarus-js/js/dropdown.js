import { computePosition, applyPosition } from "./core/positioning.js";
import { onClickOutside } from "./core/overlay.js";
import { onEscapeKey } from "./core/focus.js";
import { autoInit, createInstanceRegistry } from "./core/register.js";

const instances = createInstanceRegistry();

export class Dropdown {
  constructor(toggleEl, options = {}) {
    const targetSelector = toggleEl.getAttribute("data-cl-target");
    const menuEl = targetSelector ? document.querySelector(targetSelector) : toggleEl.nextElementSibling;

    if (!menuEl) {
      throw new Error("Clarus.Dropdown: elemento do menu não encontrado (data-cl-target).");
    }

    this.toggleEl = toggleEl;
    this.menuEl = menuEl;
    this.placement = options.placement ?? toggleEl.getAttribute("data-placement") ?? "bottom";
    this.align = options.align ?? toggleEl.getAttribute("data-align") ?? "start";
    this.isOpen = false;
    this._outsideClickCleanup = null;

    document.body.appendChild(this.menuEl);

    this.toggleEl.setAttribute("aria-haspopup", "menu");
    this.toggleEl.setAttribute("aria-expanded", "false");
    this.menuEl.setAttribute("role", "menu");

    this._handleToggleClick = this._handleToggleClick.bind(this);
    this._handleMenuKeydown = this._handleMenuKeydown.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);

    this.toggleEl.addEventListener("click", this._handleToggleClick);
    this.menuEl.addEventListener("keydown", this._handleMenuKeydown);
    this.menuEl.addEventListener("click", this._handleMenuClick);

    this._removeEscapeListener = onEscapeKey(() => {
      if (this.isOpen) {
        this.hide();
        this.toggleEl.focus();
      }
    });

    instances.set(toggleEl, this);
  }

  static getInstance(el) {
    return instances.get(el);
  }

  _handleToggleClick(event) {
    event.preventDefault();
    this.toggle();
  }

  _handleMenuClick(event) {
    if (event.target.closest(".cl-dropdown-item")) {
      this.hide();
      this.toggleEl.focus();
    }
  }

  _handleMenuKeydown(event) {
    const items = Array.from(this.menuEl.querySelectorAll(".cl-dropdown-item:not(.is-disabled)"));
    const currentIndex = items.indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    }
  }

  show() {
    if (this.isOpen) return;
    this.isOpen = true;

    const theme = this.toggleEl.closest("[data-theme]")?.getAttribute("data-theme");
    if (theme) {
      this.menuEl.setAttribute("data-theme", theme);
    } else {
      this.menuEl.removeAttribute("data-theme");
    }

    this.menuEl.classList.add("is-open");

    const position = computePosition(this.toggleEl, this.menuEl, {
      placement: this.placement,
      align: this.align,
      offset: 4,
    });
    applyPosition(this.menuEl, position);

    this.toggleEl.setAttribute("aria-expanded", "true");

    const firstItem = this.menuEl.querySelector(".cl-dropdown-item:not(.is-disabled)");
    firstItem?.focus();

    this._outsideClickCleanup = onClickOutside(this.menuEl, (event) => {
      if (this.toggleEl.contains(event.target)) return;
      this.hide();
    });

    this.toggleEl.dispatchEvent(new CustomEvent("cl:dropdown:shown", { bubbles: true }));
  }

  hide() {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.menuEl.classList.remove("is-open");
    this.menuEl.style.removeProperty("position");
    this.menuEl.style.removeProperty("top");
    this.menuEl.style.removeProperty("left");
    this.toggleEl.setAttribute("aria-expanded", "false");

    this._outsideClickCleanup?.();
    this._outsideClickCleanup = null;

    this.toggleEl.dispatchEvent(new CustomEvent("cl:dropdown:hidden", { bubbles: true }));
  }

  toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  dispose() {
    this.hide();
    this._removeEscapeListener();
    this.toggleEl.removeEventListener("click", this._handleToggleClick);
    this.menuEl.removeEventListener("keydown", this._handleMenuKeydown);
    this.menuEl.removeEventListener("click", this._handleMenuClick);
    instances.delete(this.toggleEl);
  }
}

autoInit("dropdown", Dropdown);
