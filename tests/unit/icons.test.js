import { describe, it, expect } from "vitest";
import check from "../../packages/clarus-icons/icons/check.js";
import arrowRight from "../../packages/clarus-icons/icons/arrow-right.js";
import deleteIcon from "../../packages/clarus-icons/icons/delete.js";
import { check as checkFromBarrel, arrowRight as arrowRightFromBarrel, deleteIcon as deleteIconFromBarrel } from "../../packages/clarus-icons/index.js";

describe("clarus-icons", () => {
  it("cada módulo de ícone exporta uma string de SVG válida com class=cl-icon", () => {
    expect(check).toMatch(/^<svg class="cl-icon"/);
    expect(check).toContain("</svg>");
    expect(check).not.toContain("lucide-check");
  });

  it("não sobra comentário de licença nem atributos redundantes após a limpeza", () => {
    expect(arrowRight).not.toContain("<!--");
    expect(arrowRight).not.toMatch(/\s{2,}/);
  });

  it("usa stroke=currentColor (cor acompanha o texto)", () => {
    expect(check).toContain('stroke="currentColor"');
  });

  it("nomes que colidem com palavras reservadas do JS ganham sufixo Icon no barrel", () => {
    expect(deleteIcon).toContain("<svg");
    expect(deleteIconFromBarrel).toBe(deleteIcon);
  });

  it("o barrel (index.js) reexporta os mesmos módulos individuais", () => {
    expect(checkFromBarrel).toBe(check);
    expect(arrowRightFromBarrel).toBe(arrowRight);
  });
});
