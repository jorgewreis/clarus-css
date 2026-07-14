# clarus-cli

**Pacote opcional — não é necessário para usar o núcleo CSS.**

CLI oficial do [Clarus CSS](https://github.com/jorgewreis/clarus-css) — três
comandos que empacotam ferramentas já usadas internamente pelo framework,
pra qualquer projeto consumidor.

## Instalação

```bash
npm install --save-dev clarus-cli
```

## Comandos

### `clarus build`

Compila um entry-point `.scss` com o mesmo pipeline usado internamente pelo
Clarus (Sass → Autoprefixer → cssnano opcional), sem exigir que o
consumidor monte a própria toolchain de build.

```bash
clarus build src/app.scss -o dist/app.css --minify
```

### `clarus theme`

Gera um preset de marca (`data-brand`) em **CSS puro** (`color-mix()`),
pronto pra incluir depois do CSS do Clarus — mesma fórmula de mistura usada
em `packages/clarus-core/scss/themes/_brands.scss`, sem dependência de Sass.
Também define `--cl-btn-color`/`--cl-badge-color` automaticamente (escolhe
branco ou preto pelo contraste com a cor primary), evitando a limitação
conhecida de `.cl-btn-primary`/`.cl-badge-primary` documentada em
[`docs/guides/theming.md#multi-brand`](../../docs/guides/theming.md#multi-brand).

```bash
clarus theme acme --primary "#2563eb" -o dist/brand-acme.css
```

### `clarus analyze`

Mostra o tamanho bruto e gzip de um ou mais arquivos CSS/JS — versão
genérica (sem budgets fixos) de `scripts/size.mjs`.

```bash
clarus analyze dist/app.css dist/app.js
```

## Licença

MIT
