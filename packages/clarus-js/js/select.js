import { Dropdown } from "./dropdown.js";
import { autoInit, createInstanceRegistry } from "./core/register.js";

const instances = createInstanceRegistry();

export class Select {
  constructor(selectEl) {
    if (selectEl.tagName !== "SELECT") {
      throw new Error("Clarus.Select: elemento precisa ser um <select> nativo.");
    }

    this.selectEl = selectEl;
    this.size = selectEl.getAttribute("data-size");

    this._buildMarkup();
    this._syncFromNativeSelect();

    this.dropdown = new Dropdown(this.toggleEl);

    this.toggleEl.setAttribute("aria-haspopup", "listbox");
    this.menuEl.setAttribute("role", "listbox");

    this.toggleEl.addEventListener("cl:dropdown:shown", () => {
      this.menuEl.style.width = `${this.toggleEl.offsetWidth}px`;
    });

    this._handleItemClick = this._handleItemClick.bind(this);
    this.menuEl.addEventListener("click", this._handleItemClick);

    instances.set(selectEl, this);
  }

  static getInstance(el) {
    return instances.get(el);
  }

  _buildMarkup() {
    const wrapper = document.createElement("div");
    wrapper.className = "cl-dropdown cl-form-select-dropdown";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "cl-form-select";
    if (this.size === "sm" || this.size === "lg") {
      toggle.classList.add(`cl-form-select-${this.size}`);
    }
    toggle.disabled = this.selectEl.disabled;

    const menu = document.createElement("div");
    menu.className = "cl-dropdown-menu";

    Array.from(this.selectEl.options).forEach((option) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "cl-dropdown-item";
      item.setAttribute("role", "option");
      item.textContent = option.textContent;
      if (option.disabled) item.classList.add("is-disabled");
      menu.appendChild(item);
    });

    this.selectEl.insertAdjacentElement("afterend", wrapper);
    wrapper.appendChild(toggle);
    wrapper.appendChild(menu);

    this.selectEl.style.display = "none";
    this.wrapperEl = wrapper;
    this.toggleEl = toggle;
    this.menuEl = menu;
  }

  _syncFromNativeSelect() {
    const selectedOption = this.selectEl.options[this.selectEl.selectedIndex];
    this.toggleEl.textContent = selectedOption ? selectedOption.textContent : "";

    Array.from(this.menuEl.children).forEach((item, index) => {
      const isSelected = index === this.selectEl.selectedIndex;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });
  }

  _handleItemClick(event) {
    const item = event.target.closest(".cl-dropdown-item:not(.is-disabled)");
    if (!item) return;

    const index = Array.from(this.menuEl.children).indexOf(item);
    this.selectEl.selectedIndex = index;
    this._syncFromNativeSelect();

    this.selectEl.dispatchEvent(new Event("change", { bubbles: true }));
    this.selectEl.dispatchEvent(
      new CustomEvent("cl:select:changed", { bubbles: true, detail: { value: this.selectEl.value } }),
    );
  }

  show() {
    this.dropdown.show();
  }

  hide() {
    this.dropdown.hide();
  }

  toggle() {
    this.dropdown.toggle();
  }

  dispose() {
    this.dropdown.dispose();
    this.menuEl.removeEventListener("click", this._handleItemClick);
    this.wrapperEl.remove();
    this.selectEl.style.display = "";
    instances.delete(this.selectEl);
  }
}

autoInit("select", Select);
