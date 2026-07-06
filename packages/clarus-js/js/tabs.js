import { autoInit, createInstanceRegistry } from "./core/register.js";

const instances = createInstanceRegistry();
let idCounter = 0;

export class Tabs {
  constructor(tablistEl) {
    this.tablistEl = tablistEl;
    this.tabs = Array.from(tablistEl.querySelectorAll(".nav-link"));

    tablistEl.setAttribute("role", "tablist");

    this.tabs.forEach((tab) => {
      const isActive = tab.classList.contains("active");

      idCounter += 1;
      if (!tab.id) tab.id = `clarus-tab-${idCounter}`;

      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");

      const paneSelector = tab.getAttribute("data-target");
      const pane = paneSelector ? document.querySelector(paneSelector) : null;

      if (pane) {
        pane.setAttribute("role", "tabpanel");
        pane.setAttribute("aria-labelledby", tab.id);
      }
    });

    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);

    tablistEl.addEventListener("click", this._handleClick);
    tablistEl.addEventListener("keydown", this._handleKeydown);

    instances.set(tablistEl, this);
  }

  static getInstance(el) {
    return instances.get(el);
  }

  _handleClick(event) {
    const tab = event.target.closest(".nav-link:not(.disabled)");
    if (!tab || !this.tabs.includes(tab)) return;
    this.show(tab);
  }

  _handleKeydown(event) {
    const enabledTabs = this.tabs.filter((tab) => !tab.classList.contains("disabled"));
    const currentIndex = enabledTabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabledTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabledTabs.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = enabledTabs[nextIndex];
    nextTab.focus();
    this.show(nextTab);
  }

  show(tab) {
    if (tab.classList.contains("active")) return;

    this.tabs.forEach((otherTab) => {
      const isActive = otherTab === tab;

      otherTab.classList.toggle("active", isActive);
      otherTab.setAttribute("aria-selected", String(isActive));
      otherTab.setAttribute("tabindex", isActive ? "0" : "-1");

      const paneSelector = otherTab.getAttribute("data-target");
      const pane = paneSelector ? document.querySelector(paneSelector) : null;
      pane?.classList.toggle("active", isActive);
    });

    tab.dispatchEvent(
      new CustomEvent("clarus:tab:changed", { bubbles: true, detail: { target: tab.getAttribute("data-target") } }),
    );
  }

  dispose() {
    this.tablistEl.removeEventListener("click", this._handleClick);
    this.tablistEl.removeEventListener("keydown", this._handleKeydown);
    instances.delete(this.tablistEl);
  }
}

autoInit("tabs", Tabs);
