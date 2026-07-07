#!/usr/bin/env node
// Codemod da migração v1 (ver docs/guides/migration-v1.md). Reescreve, em
// arquivos HTML/JS de quem CONSOME o Clarus CSS, os nomes renomeados na
// Fase 0.3 (classes com prefixo `cl-`/`u-`, estados `is-*`, atributos
// `data-cl-*` e eventos `cl:*`). Não faz parte do build do framework.
//
// Uso:
//   node migrate-v1.mjs <arquivo-ou-pasta> [...mais] [--dry-run]
//
// Sem --dry-run, sobrescreve os arquivos in-place — rode com o working tree
// limpo (git) para poder revisar o diff depois.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const { map: classMap } = JSON.parse(
  fs.readFileSync(path.join(scriptDir, "migrate-v1-map.json"), "utf8"),
);

const dryRun = process.argv.includes("--dry-run");
const targets = process.argv.slice(2).filter((a) => !a.startsWith("--"));

if (targets.length === 0) {
  console.error(
    "Uso: node migrate-v1.mjs <arquivo-ou-pasta> [...mais] [--dry-run]",
  );
  process.exitCode = 1;
  process.exit();
}

const extensions = new Set([".html", ".htm", ".js", ".mjs", ".cjs", ".jsx", ".tsx"]);

function collectFiles(target, out) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    if (path.basename(target) === "node_modules") return;
    for (const entry of fs.readdirSync(target)) {
      collectFiles(path.join(target, entry), out);
    }
  } else if (extensions.has(path.extname(target))) {
    out.push(target);
  }
}

function replaceClassAttr(html) {
  return html.replace(/class=(["'])([^"']*)\1/g, (full, quote, value) => {
    const tokens = value.split(/(\s+)/).map((tok) => {
      if (/^\s+$/.test(tok) || tok === "") return tok;
      return classMap[tok] ?? tok;
    });

    return `class=${quote}${tokens.join("")}${quote}`;
  });
}

function replaceAttrsAndEvents(text) {
  return text
    .replace(/data-clarus(?=[="\s>])/g, "data-cl")
    .replace(/data-target(?=[="\s>])/g, "data-cl-target")
    .replace(/data-dismiss(?=[="\s>])/g, "data-cl-dismiss")
    .replace(/--clarus-/g, "--cl-")
    .replace(/(['"`])clarus:/g, "$1cl:");
}

function migrate(text) {
  return replaceAttrsAndEvents(replaceClassAttr(text));
}

const files = [];
for (const target of targets) collectFiles(target, files);

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = migrate(original);

  if (updated === original) continue;
  changed += 1;

  if (dryRun) {
    console.log(`[dry-run] mudaria: ${file}`);
  } else {
    fs.writeFileSync(file, updated);
    console.log(`migrado: ${file}`);
  }
}

console.log(
  `\n${files.length} arquivo(s) verificado(s), ${changed} ${dryRun ? "seriam alterados" : "alterados"}.`,
);
console.log(
  "\nAviso: a substituição de classes é por correspondência exata de token " +
    "(sem prefixo → com prefixo). Se você tem uma classe própria com o mesmo " +
    "nome de uma classe antiga do Clarus (ex.: `.card`), revise o diff antes " +
    "de commitar — o codemod não sabe diferenciar as duas.",
);
