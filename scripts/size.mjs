import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import zlib from "node:zlib";
import { promisify } from "node:util";

const gzip = promisify(zlib.gzip);

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, "dist");
const outFile = path.join(rootDir, "docs", "reference", "size-baseline.json");

// Arquivos minificados publicados que compõem as distribuições do pacote
// (ver `exports`/`files` em package.json). Servem de base para os budgets
// de tamanho da Fase 3 (gate no CI).
const targets = [
  "css/layout.min.css",
  "css/forms.min.css",
  "css/components.min.css",
  "css/helpers.min.css",
  "css/fonts.min.css",
  "css/clarus.min.css",
  "js/clarus.min.js",
];

async function measure(relPath) {
  const abs = path.join(distDir, relPath);
  const raw = await fs.readFile(abs);
  const gzipped = await gzip(raw, { level: 9 });
  return { path: relPath, bytes: raw.length, gzipBytes: gzipped.length };
}

function fmtKb(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

async function run() {
  const results = await Promise.all(targets.map(measure));

  console.log("Tamanho das distribuições (dist/, minificado):\n");
  console.log(
    ["Arquivo".padEnd(24), "Bruto".padStart(10), "Gzip".padStart(10)].join(
      "  ",
    ),
  );
  for (const r of results) {
    console.log(
      [
        r.path.padEnd(24),
        fmtKb(r.bytes).padStart(10),
        fmtKb(r.gzipBytes).padStart(10),
      ].join("  "),
    );
  }

  const baseline = {
    measuredAt: new Date().toISOString(),
    unit: "bytes",
    files: Object.fromEntries(
      results.map((r) => [r.path, { bytes: r.bytes, gzipBytes: r.gzipBytes }]),
    ),
  };

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`\nBaseline registrada em ${path.relative(rootDir, outFile)}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
