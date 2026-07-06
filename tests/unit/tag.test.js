import { describe, it, expect, afterEach, vi } from "vitest";
import { Tag } from "../../packages/clarus-js/js/tag.js";

function buildTag() {
  const el = document.createElement("span");
  el.className = "badge tag";
  el.innerHTML = `
    Frontend
    <button type="button" class="btn-close" data-dismiss="tag" aria-label="Remover"></button>
  `;
  document.body.appendChild(el);

  return { el, tag: new Tag(el) };
}

describe("Tag", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("getInstance() retorna a instância criada", () => {
    const { el, tag } = buildTag();
    expect(Tag.getInstance(el)).toBe(tag);
  });

  it("clicar no .btn-close remove a tag do DOM", () => {
    const { el } = buildTag();

    el.querySelector(".btn-close").click();

    expect(document.body.contains(el)).toBe(false);
  });

  it("clicar em outro lugar da tag não remove", () => {
    const { el } = buildTag();

    el.click();

    expect(document.body.contains(el)).toBe(true);
  });

  it("dispara clarus:tag:dismissed (cancelável) antes de remover", () => {
    const { el } = buildTag();
    const handler = vi.fn();
    el.addEventListener("clarus:tag:dismissed", handler);

    el.querySelector(".btn-close").click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].cancelable).toBe(true);
  });

  it("preventDefault() em clarus:tag:dismissed cancela a remoção", () => {
    const { el } = buildTag();
    el.addEventListener("clarus:tag:dismissed", (event) => event.preventDefault());

    el.querySelector(".btn-close").click();

    expect(document.body.contains(el)).toBe(true);
  });

  it("dismiss() chamado diretamente também remove a tag", () => {
    const { el, tag } = buildTag();

    tag.dismiss();

    expect(document.body.contains(el)).toBe(false);
  });

  it("dispose() remove o listener e o registro da instância (sem remover a tag)", () => {
    const { el, tag } = buildTag();
    tag.dispose();

    el.querySelector(".btn-close").click();

    expect(document.body.contains(el)).toBe(true);
    expect(Tag.getInstance(el)).toBeUndefined();
  });
});
