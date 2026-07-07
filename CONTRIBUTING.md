# Contribuindo com o Clarus CSS

Ao participar deste projeto, você concorda em seguir o
[Código de Conduta](CODE_OF_CONDUCT.md).

## Pré-requisitos

- Node.js >= 18

## Setup

```bash
npm install
```

## Scripts

- `npm run build` — compila `packages/*/scss` e `packages/clarus-js/js` para
  `dist/` (CSS expandido + minificado com source maps, JS via esbuild).
- `npm run watch` — recompila automaticamente ao editar arquivos em
  `packages/*/scss` ou `packages/clarus-js/js`.
- `npm run lint` — roda o stylelint sobre `scss/**/*.scss` e `packages/*/scss/**/*.scss`.
- `npm test` — roda os testes unitários (Vitest).
- `npm run test:visual` — roda a regressão visual (Playwright).
- `npm run test:a11y` — audita os mockups com axe-core (Playwright, regras
  WCAG 2.1 A/AA); ver [matriz de acessibilidade](docs/reference/accessibility-matrix.md).
- `npm run contrast` / `npm run contrast:check` — audita contraste WCAG dos
  tokens de cor (ver `docs/reference/contrast-report.md`); rode depois de
  alterar cores/pesos de mistura. A variante `:check` falha o build se
  algum par ficar abaixo de AA (gate do CI).
- `npm run size` / `npm run size:check` — mede o tamanho gzip das
  distribuições e atualiza `docs/reference/size-baseline.json`. A variante
  `:check` falha o build se algum budget (definido em `scripts/size.mjs`)
  for ultrapassado (gate do CI). Inclua o relatório de tamanho no
  `CHANGELOG.md` de toda release que altere `dist/`.

## Convenções de SCSS

Antes de criar ou alterar módulos SCSS, leia
[`docs/reference/scss-architecture.md`](docs/reference/scss-architecture.md) — inclui a
organização em monorepo e o uso de cascade layers (`@layer`). Resumo do fluxo
para novos componentes:

1. Criar `packages/clarus-components/scss/components/_nome-do-componente.scss`.
2. Adicionar o arquivo em `packages/clarus-components/scss/components/_index.scss`.
3. Documentar a API de classes em Markdown.
4. Adicionar exemplo em `mockup/` quando fizer sentido.

## Decisões do projeto

As decisões de arquitetura e escopo já firmadas estão em
[`docs/reference/definitions.md`](docs/reference/definitions.md). Mudanças que contradigam uma
decisão firme devem ser discutidas antes de implementadas.

## Semver e depreciação

O projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/)
estrito:

- **Major**: qualquer mudança breaking na API pública (classes, atributos
  `data-cl-*`, eventos `cl:*`, tokens `--cl-*`, assinatura de métodos
  JS/`Clarus.*`).
- **Minor**: novos componentes, novas classes/utilitários, novos tokens —
  sempre aditivos.
- **Patch**: correções de bug sem mudança de API.

Depreciações passam por **duas versões minor** antes de remoção:

1. Na versão em que a API é marcada obsoleta: continua funcionando, é
   documentada como depreciada (nota no Markdown do componente + entrada no
   `CHANGELOG.md` sob `### Deprecated`), e — quando tecnicamente viável — emite
   aviso (ex.: `console.warn` no JS).
2. Na minor seguinte: permanece depreciada, sem remoção.
3. Só é removida numa **major**, nunca numa minor/patch.

## Pull Requests

- Uma branch por mudança, a partir de `main`.
- Rode `npm run lint`, `npm run build` e `npm test` localmente antes de abrir
  o PR (o template de PR traz o checklist completo).
- Descreva o "porquê" da mudança, não só o "o quê".
- Mudanças breaking precisam de nota no `CHANGELOG.md` e, se afetarem a API
  pública coberta pelo guia de migração, atualização de
  [`docs/guides/migration-v1.md`](docs/guides/migration-v1.md).

## Reportando bugs e propondo funcionalidades

Use os templates de issue (`.github/ISSUE_TEMPLATE/`) ao abrir uma issue —
eles pedem o mínimo de contexto para triagem rápida.
