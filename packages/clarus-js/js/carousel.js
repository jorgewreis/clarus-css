import { autoInit, createInstanceRegistry } from "./core/register.js";

const instances = createInstanceRegistry();

export class Carousel {
  constructor(carouselEl) {
    this.carouselEl = carouselEl;
    this.inner = carouselEl.querySelector(".cl-carousel-inner");
    this.items = Array.from(carouselEl.querySelectorAll(".cl-carousel-item"));
    this.indicators = Array.from(carouselEl.querySelectorAll(".cl-carousel-indicators button"));
    this.prevBtn = carouselEl.querySelector(".cl-carousel-control-prev");
    this.nextBtn = carouselEl.querySelector(".cl-carousel-control-next");

    this.interval = Number(carouselEl.getAttribute("data-interval")) || 5000;
    this.autoplay = carouselEl.getAttribute("data-autoplay") === "true";
    this.timer = null;

    this.index = Math.max(
      this.items.findIndex((item) => item.classList.contains("is-active")),
      0,
    );

    carouselEl.setAttribute("role", "group");
    carouselEl.setAttribute("aria-roledescription", "carousel");
    if (!carouselEl.hasAttribute("tabindex")) carouselEl.setAttribute("tabindex", "0");
    if (this.inner) this.inner.setAttribute("aria-live", this.autoplay ? "off" : "polite");

    this._render();

    this._handlePrev = () => this.prev();
    this._handleNext = () => this.next();
    this._handleIndicator = (event) => {
      const i = this.indicators.indexOf(event.currentTarget);
      if (i !== -1) this.goTo(i);
    };
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handlePointerDown = this._handlePointerDown.bind(this);
    this._handlePointerUp = this._handlePointerUp.bind(this);
    this._pause = () => this.pause();
    this._resume = () => this._startTimer();

    this.prevBtn?.addEventListener("click", this._handlePrev);
    this.nextBtn?.addEventListener("click", this._handleNext);
    this.indicators.forEach((btn) => btn.addEventListener("click", this._handleIndicator));
    carouselEl.addEventListener("keydown", this._handleKeydown);
    carouselEl.addEventListener("pointerdown", this._handlePointerDown);
    carouselEl.addEventListener("mouseenter", this._pause);
    carouselEl.addEventListener("mouseleave", this._resume);
    carouselEl.addEventListener("focusin", this._pause);
    carouselEl.addEventListener("focusout", this._resume);

    instances.set(carouselEl, this);

    if (this.autoplay) this._startTimer();
  }

  static getInstance(el) {
    return instances.get(el);
  }

  _render() {
    if (this.inner && !this.carouselEl.classList.contains("cl-carousel-fade")) {
      this.inner.style.transform = `translateX(-${this.index * 100}%)`;
    }

    this.items.forEach((item, i) => {
      item.classList.toggle("is-active", i === this.index);
      item.setAttribute("aria-hidden", String(i !== this.index));
    });

    this.indicators.forEach((btn, i) => {
      btn.classList.toggle("is-active", i === this.index);
      btn.setAttribute("aria-current", String(i === this.index));
    });
  }

  _goToIndex(nextIndex) {
    const count = this.items.length;
    if (count === 0) return;

    const from = this.index;
    const to = ((nextIndex % count) + count) % count;
    if (to === from) return;

    this.index = to;
    this._render();

    this.carouselEl.dispatchEvent(
      new CustomEvent("cl:carousel:slid", { bubbles: true, detail: { from, to } }),
    );
  }

  next() {
    this._goToIndex(this.index + 1);
  }

  prev() {
    this._goToIndex(this.index - 1);
  }

  goTo(i) {
    this._goToIndex(i);
  }

  _startTimer() {
    if (!this.autoplay) return;
    this.pause();
    this.timer = setInterval(() => this.next(), this.interval);
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  _handleKeydown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.prev();
    } else if (event.key === "Home") {
      event.preventDefault();
      this.goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      this.goTo(this.items.length - 1);
    }
  }

  _handlePointerDown(event) {
    this._pointerStartX = event.clientX;
    window.addEventListener("pointerup", this._handlePointerUp, { once: true });
  }

  _handlePointerUp(event) {
    const delta = event.clientX - this._pointerStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) this.next();
    else this.prev();
  }

  dispose() {
    this.pause();
    this.prevBtn?.removeEventListener("click", this._handlePrev);
    this.nextBtn?.removeEventListener("click", this._handleNext);
    this.indicators.forEach((btn) => btn.removeEventListener("click", this._handleIndicator));
    this.carouselEl.removeEventListener("keydown", this._handleKeydown);
    this.carouselEl.removeEventListener("pointerdown", this._handlePointerDown);
    this.carouselEl.removeEventListener("mouseenter", this._pause);
    this.carouselEl.removeEventListener("mouseleave", this._resume);
    this.carouselEl.removeEventListener("focusin", this._pause);
    this.carouselEl.removeEventListener("focusout", this._resume);
    instances.delete(this.carouselEl);
  }
}

autoInit("carousel", Carousel);
