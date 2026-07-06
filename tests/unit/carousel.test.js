import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { Carousel } from "../../packages/clarus-js/js/carousel.js";

function buildCarousel({ autoplay = false, interval } = {}) {
  const container = document.createElement("div");
  const autoplayAttr = autoplay ? ` data-autoplay="true"` : "";
  const intervalAttr = interval ? ` data-interval="${interval}"` : "";
  container.innerHTML = `
    <div class="carousel" id="carousel"${autoplayAttr}${intervalAttr}>
      <div class="carousel-inner">
        <div class="carousel-item active">Slide 1</div>
        <div class="carousel-item">Slide 2</div>
        <div class="carousel-item">Slide 3</div>
      </div>
      <button class="carousel-control-prev" type="button" aria-label="Anterior"></button>
      <button class="carousel-control-next" type="button" aria-label="Próximo"></button>
      <ol class="carousel-indicators">
        <li><button type="button" aria-label="Slide 1"></button></li>
        <li><button type="button" aria-label="Slide 2"></button></li>
        <li><button type="button" aria-label="Slide 3"></button></li>
      </ol>
    </div>
  `;
  document.body.appendChild(container);
  const el = container.querySelector("#carousel");
  return { container, el, carousel: new Carousel(el) };
}

describe("Carousel", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("getInstance() retorna a instância criada", () => {
    const { el, carousel } = buildCarousel();
    expect(Carousel.getInstance(el)).toBe(carousel);
  });

  it("define role/aria-roledescription e o primeiro slide como ativo", () => {
    const { el } = buildCarousel();
    const items = el.querySelectorAll(".carousel-item");
    expect(el.getAttribute("role")).toBe("group");
    expect(el.getAttribute("aria-roledescription")).toBe("carousel");
    expect(items[0].classList.contains("active")).toBe(true);
    expect(items[0].getAttribute("aria-hidden")).toBe("false");
    expect(items[1].getAttribute("aria-hidden")).toBe("true");
  });

  it("next() avança e prev() volta, com wrap circular", () => {
    const { el, carousel } = buildCarousel();
    const items = el.querySelectorAll(".carousel-item");

    carousel.next();
    expect(items[1].classList.contains("active")).toBe(true);

    carousel.prev();
    expect(items[0].classList.contains("active")).toBe(true);

    carousel.prev();
    expect(items[2].classList.contains("active")).toBe(true); // wrap para o último
  });

  it("clicar no controle next avança o slide", () => {
    const { el } = buildCarousel();
    el.querySelector(".carousel-control-next").click();
    expect(el.querySelectorAll(".carousel-item")[1].classList.contains("active")).toBe(true);
  });

  it("clicar num indicador vai direto ao slide e marca aria-current", () => {
    const { el } = buildCarousel();
    const indicators = el.querySelectorAll(".carousel-indicators button");
    indicators[2].click();
    expect(el.querySelectorAll(".carousel-item")[2].classList.contains("active")).toBe(true);
    expect(indicators[2].classList.contains("active")).toBe(true);
    expect(indicators[2].getAttribute("aria-current")).toBe("true");
  });

  it("ArrowRight/ArrowLeft/Home/End navegam pelo teclado", () => {
    const { el } = buildCarousel();
    const items = el.querySelectorAll(".carousel-item");

    el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(items[1].classList.contains("active")).toBe(true);

    el.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    expect(items[2].classList.contains("active")).toBe(true);

    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    expect(items[0].classList.contains("active")).toBe(true);
  });

  it("dispara clarus:carousel:slid com from/to no detail", () => {
    const { el, carousel } = buildCarousel();
    const handler = vi.fn();
    el.addEventListener("clarus:carousel:slid", handler);

    carousel.next();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ from: 0, to: 1 });
  });

  describe("autoplay", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("avança sozinho no intervalo e pausa no hover", () => {
      const { el } = buildCarousel({ autoplay: true, interval: 1000 });
      const items = el.querySelectorAll(".carousel-item");

      vi.advanceTimersByTime(1000);
      expect(items[1].classList.contains("active")).toBe(true);

      el.dispatchEvent(new MouseEvent("mouseenter"));
      vi.advanceTimersByTime(3000);
      expect(items[1].classList.contains("active")).toBe(true); // pausado, não avançou
    });
  });

  it("dispose() para o timer, remove listeners e o registro", () => {
    const { el, carousel } = buildCarousel();
    carousel.dispose();
    expect(Carousel.getInstance(el)).toBeUndefined();
  });
});
